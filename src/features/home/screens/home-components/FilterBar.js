import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BrandModelService from "../../service/brand_model_service";
import { API_BASE_URL } from "../../../../config/config";
const FilterBar = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBrands = await BrandModelService.getAllBrands();
        const fetchedModels = await BrandModelService.getAllModels();
        setBrands(fetchedBrands);
        setModels(fetchedModels);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  // Filtrer les modèles en fonction de la marque sélectionnée
  const filteredModels = models.filter(
    (model) => model.brand === selectedBrand
  );

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
              <Picker.Item
                key={model.id}
                label={model.name}
                value={model.name}
              />
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
