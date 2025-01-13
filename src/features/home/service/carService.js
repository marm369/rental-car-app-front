// services/carService.js
import { endpoint } from '../../../config/config';

import axios from 'axios';

const API_FILTER_URL = `${endpoint}/cars/filter`;
const API_GET_ALL_CARS_URL = `${endpoint}/cars/getAllCars`;

export const applyCarFilters = async (filters) => {
  try {
    const response = await axios.post(API_FILTER_URL, filters, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel API :', error);
    throw error;
  }
};


export const getAllCars = async () => {
  try {
    const response = await axios.get(API_GET_ALL_CARS_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des voitures", error);
    throw error;
  }
};
