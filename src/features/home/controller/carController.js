import { getAllCars, applyCarFilters } from '../service/carService';

export const carController = {
  // Fonction pour récupérer toutes les voitures
  getCars: async () => {
    try {
      const cars = await getAllCars();
      return cars;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des voitures');
    }
  },

  // Fonction pour appliquer des filtres sur les voitures
  filterCars: async (filters) => {
    try {
      const filteredCars = await applyCarFilters(filters);
      return filteredCars;
    } catch (error) {
      throw new Error('Erreur lors de l\'application des filtres sur les voitures');
    }
  },
};
