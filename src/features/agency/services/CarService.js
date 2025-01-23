import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "../../../config/config";

export const CarService = {
  getCarTypes: async () => {
    try {
      const response = await axios.get(`${endpoint}/cars/types`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Car types:", error);
      throw error;
    }
  },

  getAllBrands: async () => {
    try {
      const response = await axios.get(`${endpoint}/brand/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  addCar: async (carData) => {
    try {
      const response = await axios.post(`${endpoint}/cars`, carData);
      return response.data;
    } catch (error) {
      console.error("Error adding car:", error);
      throw error;
    }
  },

  getAgencyId: async () => {
    try {
      // Retrieve the username from AsyncStorage
      const username = await AsyncStorage.getItem("username");

      if (!username) {
        throw new Error("No username found in AsyncStorage.");
      }

      // Use the username in the API request
      const response = await axios.get(
        `${endpoint}/agencies/agency/${username}`
      );
      return response.data; // Assuming the response has { agencyId: ... }
    } catch (error) {
      console.error("Error fetching agency ID:", error);
      throw error;
    }
  },


  getCarsByAgence: async () => {
    try {
        const username = await AsyncStorage.getItem("username");

      if (!username) {
        throw new Error("No username found in AsyncStorage.");
      }
      const response = await axios.get(`${endpoint}/users/${username}/cars`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    }
  },
};
