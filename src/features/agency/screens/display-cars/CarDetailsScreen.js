import React from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native"
import { Car, Users, Fuel, DollarSign, Calendar, ArrowLeft } from "lucide-react-native"

const CarDetailsScreen = ({ route, navigation }) => {
  const { car } = route.params

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#1E90FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Car Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <Image source={{ uri: car.imageUrl }} style={styles.carImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.carCategory}>{car.category}</Text>
          <Text style={styles.carDetails}>
            {car.color} - {car.year}
          </Text>

          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <Users size={20} color="#1E90FF" />
              <Text style={styles.featureText}>{car.nbrPersonnes} Persons</Text>
            </View>
            <View style={styles.featureItem}>
              <Fuel size={20} color="#1E90FF" />
              <Text style={styles.featureText}>{car.fuelType}</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureItem}>
              <Calendar size={20} color="#1E90FF" />
              <Text style={styles.featureText}>{car.year}</Text>
            </View>
            <View style={styles.featureItem}>
              <DollarSign size={20} color="#1E90FF" />
              <Text style={styles.featureText}>${car.pricePerDay}/day</Text>
            </View>
          </View>

          <Text style={styles.description}>
            This {car.category} car is perfect for your next trip. With its spacious interior that can accommodate{" "}
            {car.nbrPersonnes} persons and {car.fuelType} engine, it offers both comfort and efficiency.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.rentButton}>
        <Text style={styles.rentButtonText}>Rent Now</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  carImage: {
    width: "100%",
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  carCategory: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 5,
  },
  carDetails: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 15,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4A4A4A",
  },
  description: {
    fontSize: 16,
    color: "#4A4A4A",
    lineHeight: 24,
    marginTop: 15,
  },
  rentButton: {
    backgroundColor: "#1E90FF",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  rentButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default CarDetailsScreen