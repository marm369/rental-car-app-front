import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Users, Fuel } from "lucide-react-native";
import { carController } from '../../controller/carController';


export const CarList = () => {
  const [cars, setCars] = useState([]); // État pour stocker les voitures

  useEffect(() => {
    // Appel de la fonction pour récupérer les voitures
    const fetchCars = async () => {
      try {
        const fetchedCars = await carController.getCars();
        setCars(fetchedCars); // Mise à jour de l'état avec les voitures récupérées
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars(); // Appeler la fonction pour récupérer les voitures
  }, []);

  return (
    <View style={styles.container}>
      {cars.map((car) => (
        <View key={car.id} style={styles.carCard}>
          {/* Image de la voiture */}
          <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
          <View style={styles.carInfo}>
            <View style={styles.header}>
              <View>
                <Text style={styles.brandModel}>
                  {car.brand?.name} {car.model?.name} {/* Optionnel si vous voulez inclure ces champs */}
                </Text>
                <Text style={styles.type}>{car.color}</Text>
              </View>
              <Text style={styles.price}>${car.pricePerDay}/jour</Text>
            </View>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Users size={16} color="#666" />
                <Text style={styles.detailText}>4 personnes</Text>
              </View>
              <View style={styles.detailItem}>
                <Fuel size={16} color="#666" />
                <Text style={styles.detailText}>{car.isRented ? "Louée" : "Disponible"}</Text>
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
