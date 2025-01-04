import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Users, Fuel } from "lucide-react-native";

const cars = [
  {
    id: 1,
    image: require("../../../../../assets/cars/BMWM4.jpeg"),
    brand: "BMW",
    model: "M4",
    type: "Sport",
    passengers: 4,
    fuelType: "Essence",
    year: 2023,
    price: 150,
  },
  {
    id: 2,
    image: require("../../../../../assets/cars/MercedesC300.jpeg"),
    brand: "Mercedes",
    model: "C300",
    type: "Classique",
    passengers: 5,
    fuelType: "Diesel",
    year: 2022,
    price: 130,
  },
];

export const CarList = () => {
  return (
    <View style={styles.container}>
      {cars.map((car) => (
        <View key={car.id} style={styles.carCard}>
          <Image source={car.image} style={styles.carImage} />
          <View style={styles.carInfo}>
            <View style={styles.header}>
              <View>
                <Text style={styles.brandModel}>
                  {car.brand} {car.model}
                </Text>
                <Text style={styles.type}>{car.type}</Text>
              </View>
              <Text style={styles.price}>${car.price}/jour</Text>
            </View>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Users size={16} color="#666" />
                <Text style={styles.detailText}>
                  {car.passengers} personnes
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Fuel size={16} color="#666" />
                <Text style={styles.detailText}>{car.fuelType}</Text>
              </View>
              <Text style={styles.detailText}>{car.year}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  carCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: "100%",
    height: 200,
  },
  carInfo: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  brandModel: {
    fontSize: 18,
    fontWeight: "600",
  },
  type: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0066FF",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
});
