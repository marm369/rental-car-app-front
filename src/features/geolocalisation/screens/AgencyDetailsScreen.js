import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AgencyService } from "../../agency/services/AgencyService";
import { CarService } from "../../car/services/CarService";
import ProfileService from "../../profile/services/ProfileService";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const AgencyDetailsScreen = ({ route, navigation }) => {
  const navigationCar = useNavigation();
  const { agencyId } = route.params;
  const [agency, setAgency] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgencyDetails();
  }, []);

  const fetchAgencyDetails = async () => {
    try {
      setLoading(true);
      const agencyDetails = await AgencyService.getAgencyById(agencyId);
      setAgency(agencyDetails);
      const ownerDetails = await ProfileService.getUserInfoById(
        agencyDetails.userId
      );
      setOwner(ownerDetails);
      const carsList = await CarService.getCarsByAgency(ownerDetails.username);
      setCars(carsList);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching agency details:", error);
      setError("Failed to load agency details. Please try again.");
      setLoading(false);
    }
  };

  const handleCallOwner = () => {
    if (owner.phoneNumber) {
      Linking.openURL(`tel:${owner.phoneNumber}`);
    } else {
      console.log("Le numéro de téléphone n'est pas disponible");
    }
  };

  const handleMessageOwner = () => {
    // Implement message functionality
    console.log("Messaging owner");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!agency || !owner) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{ uri: agency.imageBase64 }}
          style={styles.headerImage}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <ArrowLeft color="#3498db" size={24} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.agencyName}>{agency.name}</Text>
          <Text style={styles.description}>{agency.description}</Text>
        </View>

        <View style={styles.ownerSection}>
          <Image source={{ uri: owner.picture }} style={styles.ownerImage} />
          <View style={styles.ownerInfo}>
            <Text
              style={styles.ownerName}
            >{`${owner.firstName} ${owner.lastName}`}</Text>
            <Text style={styles.ownerEmail}>{owner.email}</Text>
            <View style={styles.ownerActions}>
              <TouchableOpacity
                onPress={handleCallOwner}
                style={styles.actionButton}
              >
                <Phone color="#3498db" size={20} />
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleMessageOwner}
                style={styles.actionButton}
              >
                <MessageCircle color="#3498db" size={20} />
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: agency.location.coordinates[1],
            longitude: agency.location.coordinates[0],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: agency.location.coordinates[1],
              longitude: agency.location.coordinates[0],
            }}
            title={agency.name}
          />
        </MapView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Cars</Text>
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigationCar.navigate("CarRentalDetails", { carId: item.id })
                }
                style={styles.carItem}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.carImage}
                />
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{item.category}</Text>
                  <Text
                    style={styles.carPrice}
                  >{`$${item.pricePerDay}/day`}</Text>
                </View>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  agencyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#34495e",
    lineHeight: 24,
  },
  ownerSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  ownerEmail: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  ownerActions: {
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#3498db",
  },
  map: {
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
  },
  carItem: {
    width: 160,
    marginRight: 16,
  },
  carImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  carInfo: {
    padding: 4,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 14,
    color: "#3498db",
  },
  backButton: {
    position: "absolute",
    top: 70,
    left: 10,
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
  },
});

export default AgencyDetailsScreen;
