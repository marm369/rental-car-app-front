import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { ReservationController } from "../controllers/ReservationController";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
const ReservationManagementScreen = () => {
  const navigation = useNavigation();
  const [showRequests, setShowRequests] = useState(true);
  const [ownerReservations, setOwnerReservations] = useState([]);
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    fetchOwnerReservations();
    fetchUserReservations();
  }, []);

  const fetchOwnerReservations = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const data = await ReservationController.getOwnerReservations(
        Number(userId)
      );
      setOwnerReservations(data);
    } catch (error) {
      console.error("Error fetching owner reservations:", error);
    }
  };

  const fetchUserReservations = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const data = await ReservationController.getUserReservationStatus(
        Number(userId)
      );
      setUserReservations(data);
    } catch (error) {
      console.error("Error fetching user reservations:", error);
    }
  };

  const handleApprove = async (reservationId, status) => {
    try {
      await ReservationController.approveReservation(reservationId, status);
      fetchOwnerReservations();
    } catch (error) {
      console.error("Error approving reservation:", error);
    }
  };

  const renderOwnerReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Image source={{ uri: item.car.imageUrl }} style={styles.carImage} />
      <View style={styles.reservationDetails}>
        <Text style={styles.detailText}>
          From: {new Date(item.startDate).toLocaleDateString()}
        </Text>
        <Text style={styles.detailText}>
          To: {new Date(item.endDate).toLocaleDateString()}
        </Text>
        <Text style={styles.statusText(item.status)}>
          Status: {item.status}
        </Text>
        <Text style={styles.detailText}>
          User: {item.user.firstName} {item.user.lastName}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => handleApprove(item.id, "Accepted")}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.refuseButton]}
          onPress={() => handleApprove(item.id, "Refused")}
        >
          <Text style={styles.buttonText}>Refuse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderUserReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Image source={{ uri: item.car.imageUrl }} style={styles.carImage} />
      <View style={styles.reservationDetails}>
        <Text style={styles.detailText}>
          From: {new Date(item.startDate).toLocaleDateString()}
        </Text>
        <Text style={styles.detailText}>
          To: {new Date(item.endDate).toLocaleDateString()}
        </Text>
        <Text style={styles.statusText(item.status)}>
          Status: {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowleft" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.headerButton,
            showRequests && styles.activeHeaderButton,
          ]}
          onPress={() => setShowRequests(true)}
        >
          <Text
            style={[
              styles.headerButtonText,
              showRequests && styles.activeHeaderButtonText,
            ]}
          >
            Reservation Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.headerButton,
            !showRequests && styles.activeHeaderButton,
          ]}
          onPress={() => setShowRequests(false)}
        >
          <Text
            style={[
              styles.headerButtonText,
              !showRequests && styles.activeHeaderButtonText,
            ]}
          >
            My Reservations
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={showRequests ? ownerReservations : userReservations}
        renderItem={
          showRequests ? renderOwnerReservationItem : renderUserReservationItem
        }
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  activeHeaderButton: {
    backgroundColor: "#007AFF",
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  activeHeaderButtonText: {
    color: "#fff",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  reservationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
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
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  reservationDetails: {
    flex: 1,
    marginLeft: 16,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  statusText: (status) => ({
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color:
      status === "Accepted"
        ? "#4CAF50"
        : status === "Refused"
        ? "#F44336"
        : "#FFC107",
  }),
  actionButtons: {
    justifyContent: "space-around",
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 4,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  refuseButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    marginRight: 20,
  },
});

export default ReservationManagementScreen;
