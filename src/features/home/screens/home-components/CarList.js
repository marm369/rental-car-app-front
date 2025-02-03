import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Users, Fuel, Car } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import FilterController from "../../controller/FilterController";

export const CarList = ({ filters }) => {
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedCars = await FilterController.filterCars(filters || {});
      setCars(fetchedCars || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0066FF" style={styles.loader} />
    );
  }

  if (!cars.length) {
    return (
      <View style={styles.noCarsContainer}>
        <Car size={48} color="#666" />
        <Text style={styles.noCarsText}>No cars available</Text>
      </View>
    );
  }
  const renderCarItem = (car) => {
    return (
      <View style={styles.carCard} key={car.id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CarRentalDetails", { carId: car.id })
          }
        >
          <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
          <View style={styles.carInfo}>
            <View style={styles.header}>
              <View>
                <Text style={styles.brandModel}>
                  {car.brandName + "  " + car.modelName}
                </Text>
                <Text style={styles.type}>
                  {car.color ?? "Couleur inconnue"}
                </Text>
              </View>
              <Text style={styles.price}>${car.pricePerDay}/jour</Text>
            </View>
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Users size={16} color="#666" />
                <Text style={styles.detailText}>
                  {car.nbrPersonnes} personnes
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Fuel size={16} color="#666" />
                <Text style={styles.detailText}>{car.fuelType}</Text>
              </View>
              <Text style={styles.detailText}>
                {car.year ?? "Année inconnue"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {cars && cars.length > 0 ? (
        cars.map((car) => renderCarItem(car))
      ) : (
        <View style={styles.noCarsContainer}>
          <Car size={48} color="#666" />
          <Text style={styles.noCarsText}>Aucune voiture disponible</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCarsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noCarsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  carCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
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
    marginRight: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});

export default CarList;
