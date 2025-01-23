import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CarService } from "../../services/CarService";
import { Users, Fuel, DollarSign, Plus } from "lucide-react-native";

const AgencyCarsScreen = () => {
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const fetchedCars = await CarService.getCarsByAgence();
        setCars(fetchedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleCarClick = (car) => {
    navigation.navigate("CarDetails", { car });
  };

  const handleAddCar = () => {
    navigation.navigate("AddCar");
  };

  const renderCar = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCarClick(item)}
      style={styles.carCard}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carCategory}>{item.category}</Text>
        <Text style={styles.carDetails}>
          {item.color} - {item.year}
        </Text>
        <View style={styles.carFeatures}>
          <View style={styles.featureItem}>
            <Users size={16} color="#1E90FF" />
            <Text style={styles.featureText}>{item.nbrPersonnes}</Text>
          </View>
          <View style={styles.featureItem}>
            <Fuel size={16} color="#1E90FF" />
            <Text style={styles.featureText}>{item.fuelType}</Text>
          </View>
          <View style={styles.featureItem}>
            <DollarSign size={16} color="#1E90FF" />
            <Text style={styles.featureText}>${item.pricePerDay}/day</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.agencyName}>My Agency</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
          <Plus size={24} color="#1E90FF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.carList}
        numColumns={1}
        key="carList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 40,
  },
  agencyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  addButton: {
    backgroundColor: "#F0F8FF",
    padding: 10,
    borderRadius: 50,
  },
  carList: {
    padding: 10,
  },
  carCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carInfo: {
    padding: 15,
  },
  carCategory: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 5,
  },
  carDetails: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 10,
  },
  carFeatures: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#4A4A4A",
  },
});

export default AgencyCarsScreen;
