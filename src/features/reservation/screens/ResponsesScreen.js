import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ReservationController } from "../controllers/ReservationController";
import { CarService } from "../../car/services/CarService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const ResponsesScreen = () => {
  const navigation = useNavigation();
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserReservations();
  }, []);

  const fetchUserReservations = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const data = await ReservationController.getUserReservationStatus(
        Number(userId)
      );

      // Fetch brand and model for each car
      const reservationsWithCarDetails = await Promise.all(
        data.map(async (reservation) => {
          const carDetails = await CarService.getBrandModelByCarId(
            reservation.car.id
          );
          return {
            ...reservation,
            car: {
              ...reservation.car,
              brand: carDetails.brandName,
              model: carDetails.modelName,
            },
          };
        })
      );

      setUserReservations(reservationsWithCarDetails);
    } catch (error) {
      console.error("Error fetching user reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Image source={{ uri: item.car.imageUrl }} style={styles.carImage} />
      <View style={styles.reservationDetails}>
        <Text style={styles.carName}>
          {item.car.brand} {item.car.model}
        </Text>
        <Text style={styles.detailText}>
          From: {new Date(item.startDate).toLocaleDateString()}
        </Text>
        <Text style={styles.detailText}>
          To: {new Date(item.endDate).toLocaleDateString()}
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText(item.status)}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowleft" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Reservation Responses</Text>
      </View>
      {userReservations.length > 0 ? (
        <FlatList
          data={userReservations}
          renderItem={renderReservationItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Icon name="calendar" size={64} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>No reservations found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F0",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reservationItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  reservationDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  carName: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333333",
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666666",
  },
  statusContainer: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  statusText: (status) => ({
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: "hidden",
    color: "#FFFFFF",
    backgroundColor:
      status === "Accepted"
        ? "#4CAF50"
        : status === "Refused"
        ? "#F44336"
        : "#FFC107",
  }),
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 18,
    color: "#666666",
  },
});

export default ResponsesScreen;
