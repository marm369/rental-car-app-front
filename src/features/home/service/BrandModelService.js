// services/BrandModelService.js
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";

const BrandModelService = {
  getAllBrands: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brand/getAll`);
      return response.data.map((brand) => brand.name); // Retourne seulement les noms des marques
    } catch (error) {
      console.error("Erreur lors de la récupération des marques :", error);
      throw error; // Propager l'erreur pour la gérer dans le composant
    }
  },

  getAllModels: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/model/getAll`);
      return response.data.map((model) => ({
        id: model.id,
        name: model.name,
        brand: model.brand.name, // Nom de la marque associée
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des modèles :", error);
      throw error; // Propager l'erreur pour la gérer dans le composant
    }
  },
};

export default BrandModelService;
