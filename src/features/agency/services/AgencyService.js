import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { endpoint } from "../../../config/config";

export const AgencyService = {
  async searchPlace(searchPlace, setSelectedLocation, setMapRegion) {
    if (!searchPlace.trim()) {
      Alert.alert("Error", "Please enter a location to search!");
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      searchPlace
    )}&format=json&addressdetails=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        Alert.alert("Error", "Unable to connect to the search service.");
        return;
      }

      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setSelectedLocation(newLocation);
        setMapRegion(newLocation);
      } else {
        Alert.alert("Error", "Location not found.");
      }
    } catch (error) {
      Alert.alert("Error", `An error occurred: ${error.message}`);
    }
  },

  async createAgency(agencyData) {
    if (
      !agencyData.agencyName ||
      !agencyData.description ||
      !agencyData.selectedLocation ||
      !agencyData.image
    ) {
      Alert.alert("Error", "Please fill all the fields and select an image!");
      return false;
    }

    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Error", "Unable to find userId in local storage!");
        return false;
      }

      const payload = {
        name: agencyData.agencyName,
        description: agencyData.description,
        location: {
          type: "Point",
          coordinates: [
            agencyData.selectedLocation.longitude,
            agencyData.selectedLocation.latitude,
          ],
        },
        imageBase64: agencyData.image,
        userId: parseInt(userId, 10),
      };

      console.log(`Sending payload: ${JSON.stringify(payload, null, 2)}`);

      const response = await fetch(`${endpoint}/agencies/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        Alert.alert("Error", "Failed to create agency. Please try again.");
        return null;
      }

      const responseData = await response.json();
      Alert.alert("Success", "Agency created successfully!");
      return responseData;
    } catch (error) {
      Alert.alert("Error", `An error occurred: ${error.message}`);
      return null;
    }
  },

  async getAgencyInfo() {
    try {
      const username = await AsyncStorage.getItem("username");
      if (!username) {
        throw new Error("Unable to find username in local storage!");
      }
      const response = await fetch(
        `${endpoint}/agencies/agencyInfo/${username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch agency info");
      }

      const data = await response.json();
      return {
        name: data.name,
        imageBase64: data.imageBase64,
      };
    } catch (error) {
      console.error("Error fetching agency info:", error);
      throw error;
    }
  },
};

export default AgencyService;
