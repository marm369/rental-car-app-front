import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const StoreDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { store } = route.params;

  // Liste des voitures proposées par le store
  const cars = [
    {
      id: 1,
      image: require("../../../../assets/cars/BMWM4.jpeg"),
      model: "BMW M4",
      year: 2023,
      price: 150,
    },
    {
      id: 2,
      image: require("../../../../assets/cars/MercedesC300.jpeg"),
      model: "Mercedes C300",
      year: 2023,
      price: 130,
    },
    {
      id: 3,
      image: require("../../../../assets/cars/AudiA5.jpeg"),
      model: "Audi A5",
      year: 2022,
      price: 120,
    },
  ];

  const renderCarItem = ({ item }) => (
    <View style={styles.carItem}>
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{item.model}</Text>
        <Text style={styles.carDetails}>
          Année : {item.year} | Prix : ${item.price}/jour
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Arrow Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Store Image */}
      <Image source={store.image} style={styles.storeImage} />

      {/* Store Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeDetails}>📍 {store.address}</Text>
        <Text style={styles.storeDetails}>📞 {store.phone}</Text>
        <Text style={styles.storeDescription}>
          {store.description ||
            `Ceci est la description du magasin ${store.name}.`}
        </Text>
      </View>

      {/* Cars List */}
      <Text style={styles.sectionTitle}>Voitures disponibles</Text>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  storeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  storeName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  storeDetails: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  storeDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  carList: {
    paddingLeft: 20,
  },
  carItem: {
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: 180,
  },
  carImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  carInfo: {
    padding: 10,
    alignItems: "center",
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  carDetails: {
    fontSize: 14,
    color: "#666",
  },
});

export default StoreDetailsScreen;
