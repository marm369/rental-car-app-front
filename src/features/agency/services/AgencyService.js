import axios from "axios";

const BASE_URL = "http://192.168.1.72:3000";

export const CarService = {
  getCarTypes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cars/types`);
      return response.data;
    } catch (error) {
      console.error("Error fetching car types:", error);
      throw error;
    }
  },

  getAllBrands: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/brand/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  addCar: async (carData) => {
    try {
      const response = await axios.post(`${BASE_URL}/cars`, carData);
      return response.data;
    } catch (error) {
      console.error("Error adding car:", error);
      throw error;
    }
  },
};
