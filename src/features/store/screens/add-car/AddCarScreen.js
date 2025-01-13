import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const AddCarScreen = ({ navigation,route }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { storeId } = route.params || {};

  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://192.168.1.1:3000/brand/getAll");
      setBrands(response.data); // Contient directement les objets de marque
    } catch (error) {
      console.error("Erreur lors de la récupération des marques :", error);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await axios.get("http://192.168.1.1:3000/model/getAll");
      setModels(response.data); // Contient directement les objets de modèle
    } catch (error) {
      console.error("Erreur lors de la récupération des modèles :", error);
    }
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your gallery!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddCar = async () => {
    if (!selectedBrandId || !selectedModelId || !year || !color || !price || !image) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    const carData = {
      brandId: selectedBrandId,
      modelId: selectedModelId,
      color:color,
      year: parseInt(year, 10),
      pricePerDay: parseFloat(price),
      agencyId: storeId, // Remplacez par l'ID réel de l'agence
      imageUrl: image, // Vous pouvez adapter l'upload d'image au backend
    };

    try {
      const response = await axios.post("http://192.168.1.1:3000/cars", carData);
      if (response.status === 201) {
        Alert.alert("Success", "Car added successfully!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la voiture :", error);
      Alert.alert("Error", "Failed to add car. Please try again.");
    }
  };

  const filteredModels = models.filter(
    (model) => model.brand.id === selectedBrandId
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backArrow}
          >
            <Text style={styles.backArrowText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add New Car</Text>
        </View>

        {/* Brand Dropdown */}
        <Text style={styles.label}>Brand</Text>
        <Picker
          selectedValue={selectedBrandId}
          onValueChange={(itemValue) => {
            setSelectedBrandId(itemValue);
            setSelectedModelId(null);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Choose a brand" value={null} />
          {brands.map((brand) => (
            <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
          ))}
        </Picker>

        {/* Model Dropdown */}
        <Text style={styles.label}>Model</Text>
        <Picker
          selectedValue={selectedModelId}
          onValueChange={setSelectedModelId}
          style={styles.picker}
          enabled={filteredModels.length > 0}
        >
          <Picker.Item label="Choose a model" value={null} />
          {filteredModels.map((model) => (
            <Picker.Item key={model.id} label={model.name} value={model.id} />
          ))}
        </Picker>

        {/* Other fields */}
        <Text style={styles.label}>Year of Production</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter production year"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter car color"
          value={color}
          onChangeText={setColor}
        />
        <Text style={styles.label}>Price Per Day ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter rental price per day"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Image Picker */}
        <Text style={styles.label}>Car Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.carImage} />
          ) : (
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
          <Text style={styles.addButtonText}>Add Car</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginLeft: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  imagePicker: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 15,
  },
  carImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePickerText: {
    color: "#888",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddCarScreen;
