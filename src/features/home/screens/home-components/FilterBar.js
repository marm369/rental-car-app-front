import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

const FilterBar = () => {
  const [brands, setBrands] = useState([]); // Liste des marques
  const [selectedBrand, setSelectedBrand] = useState(""); // Marque sélectionnée
  const [models, setModels] = useState([]); // Liste des modèles
  const [selectedModel, setSelectedModel] = useState(""); // Modèle sélectionné

  // Fonction pour récupérer les marques
  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${endpoint}/brand/getAll`);
      const brandNames = response.data.map((brand) => brand.name);
      setBrands(brandNames);
    } catch (error) {
      console.error("Erreur lors de la récupération des marques :", error);
    }
  };

  // Fonction pour récupérer les modèles
  const fetchModels = async () => {
    try {
      const response = await axios.get(`${endpoint}/model/getAll`);
      const modelData = response.data.map((model) => ({
        id: model.id,
        name: model.name,
        brand: model.brand.name, // Nom de la marque associée
      }));
      setModels(modelData);
    } catch (error) {
      console.error("Erreur lors de la récupération des modèles :", error);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

  // Filtrer les modèles en fonction de la marque sélectionnée
  const filteredModels = models.filter((model) => model.brand === selectedBrand);

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    console.log("Selected Brand:", selectedBrand);
    console.log("Selected Model:", selectedModel);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Options</Text>
      {/* Conteneur des dropdowns et du bouton */}
      <View style={styles.frame}>
        {/* Conteneur des dropdowns côte à côte */}
        <View style={styles.dropdownContainer}>
          {/* Dropdown pour les marques */}
          <Picker
            selectedValue={selectedBrand}
            onValueChange={(itemValue) => {
              setSelectedBrand(itemValue);
              setSelectedModel(""); // Réinitialiser le modèle sélectionné
            }}
            style={styles.picker}
          >
            <Picker.Item label="Choose a brand" value="" />
            {brands.map((brand, index) => (
              <Picker.Item key={index} label={brand} value={brand} />
            ))}
          </Picker>

          {/* Dropdown pour les modèles */}
          <Picker
            selectedValue={selectedModel}
            onValueChange={(itemValue) => setSelectedModel(itemValue)}
            style={styles.picker}
            enabled={filteredModels.length > 0} // Désactiver si aucun modèle
          >
            <Picker.Item label="Choose a model" value="" />
            {filteredModels.map((model) => (
              <Picker.Item key={model.id} label={model.name} value={model.name} />
            ))}
          </Picker>
        </View>

        {/* Bouton Appliquer */}
        <Button title="Apply" onPress={applyFilters} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  frame: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Ombre pour Android
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Espace entre les listes
    alignItems: "center", // Aligner les items au centre
    marginBottom: 16, // Espace entre les listes et le bouton
  },
  picker: {
    flex: 1, // Prendre un espace égal
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginHorizontal: 8, // Espacement horizontal entre les éléments
  },
  button: {
    marginTop: 16,
    backgroundColor: "#0066FF",
  },
});

export default FilterBar;
