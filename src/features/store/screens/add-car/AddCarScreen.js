import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";

const AddCarScreen = ({ navigation }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [seats, setSeats] = useState("");
  const [color, setColor] = useState("");
  const [fuel, setFuel] = useState("");
  const [price, setPrice] = useState("");
  const [carType, setCarType] = useState(null);
  const [image, setImage] = useState(null);

  const [carTypeOpen, setCarTypeOpen] = useState(false);
  const [carTypes, setCarTypes] = useState([
    { label: "Family", value: "Family" },
    { label: "City", value: "City" },
    { label: "Sport", value: "Sport" },
    { label: "Classic", value: "Classic" },
    { label: "Luxury", value: "Luxury" },
    { label: "Trip", value: "Trip" },
    { label: "Electric", value: "Electric" },
    { label: "Off-Road", value: "Off-Road" },
  ]);

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

  const handleAddCar = () => {
    if (
      !brand ||
      !model ||
      !year ||
      !seats ||
      !color ||
      !fuel ||
      !price ||
      !carType ||
      !image
    ) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    Alert.alert("Success", `${model} has been added successfully!`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
        >
          <Text style={styles.backArrowText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add New Car</Text>
      </View>

      {/* Brand Input */}
      <Text style={styles.label}>Brand</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Honda, Toyota, Fiat..."
        value={brand}
        onChangeText={setBrand}
      />

      {/* Model Input */}
      <Text style={styles.label}>Model</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter car model"
        value={model}
        onChangeText={setModel}
      />

      {/* Year Input */}
      <Text style={styles.label}>Year of Production</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter production year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />

      {/* Seats Input */}
      <Text style={styles.label}>Number of Seats</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of seats"
        value={seats}
        onChangeText={setSeats}
        keyboardType="numeric"
      />

      {/* Color Input */}
      <Text style={styles.label}>Color</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter car color"
        value={color}
        onChangeText={setColor}
      />

      {/* Fuel Input */}
      <Text style={styles.label}>Fuel Type</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Gasoline, Diesel, Electric..."
        value={fuel}
        onChangeText={setFuel}
      />

      {/* Price Input */}
      <Text style={styles.label}>Price Per Day ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter rental price per day"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Car Type Dropdown */}
      <Text style={styles.label}>Car Type</Text>
      <DropDownPicker
        open={carTypeOpen}
        value={carType}
        items={carTypes}
        setOpen={setCarTypeOpen}
        setValue={setCarType}
        setItems={setCarTypes}
        placeholder="Select a car type"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
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

      {/* Add Car Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCar}>
        <Text style={styles.addButtonText}>Add Car</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Light blue background
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
    color: "#1565C0", // Dark blue
    textAlign: "center",
    marginTop: 40,
    marginLeft: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0D47A1", // Deep blue
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#90CAF9", // Soft blue border
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#90CAF9",
  },
  imagePicker: {
    height: 150,
    backgroundColor: "#E3F2FD", // Light blue
    borderWidth: 1,
    borderColor: "#1565C0", // Dark blue
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#1565C0", // Deep blue
    fontWeight: "bold",
  },
  carImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#1565C0", // Blue button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  backArrow: {
    marginLeft: 10,
    padding: 5,
  },
  backArrowText: {
    fontSize: 20,
    color: "#1565C0",
    fontWeight: "bold",
  },
});

export default AddCarScreen;
