import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { CarService } from "../../services/CarService";
import { AgencyService } from "../../services/AgencyService";
import { Users, Fuel, Plus, Trash2 } from "lucide-react-native";

const AgencyCarsScreen = () => {
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);
  const [agencyInfo, setAgencyInfo] = useState({ name: "", imageBase64: "" });

  const fetchAgencyInfo = useCallback(async () => {
    try {
      const info = await AgencyService.getAgencyInfo();
      setAgencyInfo(info);
    } catch (error) {
      console.error("Error fetching agency info:", error);
      Alert.alert("Error", "Failed to fetch agency information");
    }
  }, []);

  const fetchCarsWithBrandAndModel = useCallback(async () => {
    try {
      const fetchedCars = await CarService.getCarsByAgence();
      const carsWithBrandAndModel = await Promise.all(
        fetchedCars.map(async (car) => {
          const { brandName, modelName } =
            await CarService.getBrandModelByCarId(Number.parseInt(car.id));
          return { ...car, brandName, modelName };
        })
      );
      setCars(carsWithBrandAndModel);
    } catch (error) {
      console.error("Error fetching cars with brand and model:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAgencyInfo();
      fetchCarsWithBrandAndModel();
    }, [fetchAgencyInfo, fetchCarsWithBrandAndModel])
  );

  const handleCarClick = (car) => {
    navigation.navigate("CarDetails", { car });
  };

  const handleAddCar = () => {
    navigation.navigate("AddCar");
  };

  const handleDeleteCar = (carId) => {
    Alert.alert("Delete Car", "Are you sure you want to delete this car?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await CarService.deleteCar(carId);
            fetchCarsWithBrandAndModel(); // Refresh the list after deletion
          } catch (error) {
            console.error("Error deleting car:", error);
            Alert.alert("Error", "Failed to delete the car. Please try again.");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const renderCar = ({ item }) => (
    <View style={styles.carCard}>
      <TouchableOpacity
        onPress={() => handleCarClick(item)}
        style={styles.carContent}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.carImage} />
        <View style={styles.carInfo}>
          <Text style={styles.carBrandModel}>
            {item.brandName} - {item.modelName}
          </Text>
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
              <Text style={styles.featureText}>${item.pricePerDay}/day</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCar(item.id)}
      >
        <Trash2 size={20} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.agencyInfo}>
          {agencyInfo.imageBase64 ? (
            <Image
              source={{
                uri: agencyInfo.imageBase64,
              }}
              style={styles.agencyImage}
            />
          ) : (
            <View style={[styles.agencyImage, styles.placeholderImage]} />
          )}
          <Text style={styles.agencyName}>{agencyInfo.name}</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
          <Plus size={24} color="#1E90FF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id}
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
  agencyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  agencyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderImage: {
    backgroundColor: "#CCC",
  },
  agencyName: {
    fontSize: 18,
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
  carBrandModel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 5,
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
  carContent: {
    flex: 1,
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
  carBrandModel: {
    fontSize: 16,
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
  deleteButton: {
    padding: 10,
  },
});

export default AgencyCarsScreen;
