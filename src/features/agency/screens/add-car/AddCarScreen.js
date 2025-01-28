import React from "react";
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
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useCarController } from "../../controllers/CarController";

const AddCarScreen = ({ navigation, route }) => {
  const { agencyId } = route.params || {};
  const {
    brands,
    carTypes,
    selectedBrand,
    carData,
    handleBrandChange,
    handleModelChange,
    handleInputChange,
    handleAddCar,
  } = useCarController(agencyId);

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
      handleInputChange("imageUrl", result.assets[0].uri);
    }
  };

  const onAddCar = async () => {
    try {
      await handleAddCar();
      Alert.alert("Success", "Car added successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to add car. Please try again."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backArrow}
          >
            <Text style={styles.backArrowText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add New Car</Text>
        </View>

        <Text style={styles.label}>Brand</Text>
        <Picker
          selectedValue={selectedBrand?.id.toString()}
          onValueChange={(itemValue) => handleBrandChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choose a brand" value="" />
          {brands.map((brand) => (
            <Picker.Item
              key={brand.id}
              label={brand.name}
              value={brand.id.toString()}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Model</Text>
        <Picker
          selectedValue={carData.modelId}
          onValueChange={(itemValue) => handleModelChange(itemValue)}
          style={styles.picker}
          enabled={selectedBrand !== null}
        >
          <Picker.Item label="Choose a model" value="" />
          {selectedBrand?.models.map((model) => (
            <Picker.Item
              key={model.id}
              label={model.name}
              value={model.id.toString()}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Year of Production</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter production year"
          value={carData.year}
          onChangeText={(value) => handleInputChange("year", value)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter car color"
          value={carData.color}
          onChangeText={(value) => handleInputChange("color", value)}
        />

        <Text style={styles.label}>Price Per Day ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter rental price per day"
          value={carData.pricePerDay}
          onChangeText={(value) => handleInputChange("pricePerDay", value)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Number of Persons</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of persons"
          value={carData.nbrPersonnes}
          onChangeText={(value) => handleInputChange("nbrPersonnes", value)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={carData.category}
          onValueChange={(itemValue) =>
            handleInputChange("category", itemValue)
          }
          style={styles.picker}
        >
          <Picker.Item label="Choose a category" value="" />
          {(carTypes?.carCategories || []).map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>

        <Text style={styles.label}>Fuel Type</Text>
        <Picker
          selectedValue={carData.fuelType}
          onValueChange={(itemValue) =>
            handleInputChange("fuelType", itemValue)
          }
          style={styles.picker}
        >
          <Picker.Item label="Choose a fuel type" value="" />
          {(carTypes?.fuelTypes || []).map((fuelType) => (
            <Picker.Item key={fuelType} label={fuelType} value={fuelType} />
          ))}
        </Picker>

        <Text style={styles.label}>Car Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
          {carData.imageUrl ? (
            <Image source={{ uri: carData.imageUrl }} style={styles.carImage} />
          ) : (
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={onAddCar}>
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
    paddingVertical: 50,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backArrow: {
    padding: 10,
  },
  backArrowText: {
    fontSize: 24,
    color: "#1565C0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#1565C0",
  },
  picker: {
    backgroundColor: "#fff",
    borderColor: "#90CAF9",
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
    borderColor: "#90CAF9",
    borderWidth: 1,
  },
  carImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePickerText: {
    color: "#1565C0",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddCarScreen;
