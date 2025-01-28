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
      console.log(carData);
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
      return response.data;
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
  getBrandModelByCarId: async (carId) => {
    try {
      const response = await axios.get(`${endpoint}/cars/${carId}/brand-model`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching brand and model for car ID ${carId}:`,
        error
      );
      throw error;
    }
  },
  deleteCar: async (carId) => {
    try {
      const response = await axios.delete(`${endpoint}/cars/delete/${carId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting car:", error);
      throw error;
    }
  },
};
