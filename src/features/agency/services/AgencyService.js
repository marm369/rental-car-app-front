import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { endpoint } from "../../../config/config";

export const AgencyService = {
  async searchPlace(searchPlace) {
    if (!searchPlace.trim()) {
      throw new Error("Please enter a location to search!");
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      searchPlace
    )}&format=json&addressdetails=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to connect to the search service.");
      }

      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return {
          latitude: Number.parseFloat(lat),
          longitude: Number.parseFloat(lon),
        };
      } else {
        throw new Error("Location not found.");
      }
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  },

  async createAgency(agencyData) {
    if (
      !agencyData.agencyName ||
      !agencyData.description ||
      !agencyData.selectedLocation ||
      !agencyData.image
    ) {
      throw new Error("Please fill all the fields and select an image!");
    }

    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error("Unable to find userId in local storage!");
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
        userId: Number.parseInt(userId, 10),
      };

      const response = await fetch(`${endpoint}/agencies/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create agency. Please try again.");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
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
