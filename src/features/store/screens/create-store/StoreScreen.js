import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import StoreStyles from "./StoreStyles";
import StoreController from "../../controllers/StoreController";

const StoreScreen = () => {
  const {
    storeName,
    setStoreName,
    description,
    setDescription,
    phone,
    setPhone,
    searchPlace,
    setSearchPlace,
    image,
    handleImagePick,
    handleSearch,
    mapRegion,
    selectedLocation,
    setSelectedLocation,
    loading,
    handleCreateStore,
  } = StoreController();

  return (
    <ScrollView style={StoreStyles.container}>
      {/* Header */}
      <View style={StoreStyles.header}>
        <Text style={StoreStyles.title}>Create Store</Text>
        <Text style={StoreStyles.subtitle}>
          Fill in the details below to create your market.
        </Text>
      </View>

      {/* Form Section */}
      <View style={StoreStyles.formContainer}>
        <Text style={StoreStyles.label}>Store Name</Text>
        <TextInput
          style={StoreStyles.input}
          placeholder="Enter Store Name"
          value={storeName}
          onChangeText={setStoreName}
        />

        <Text style={StoreStyles.label}>Description</Text>
        <TextInput
          style={[StoreStyles.input, StoreStyles.textArea]}
          placeholder="Enter Store Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={StoreStyles.label}>Phone Number</Text>
        <TextInput
          style={StoreStyles.input}
          placeholder="Enter Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={StoreStyles.label}>Store Image</Text>
        <TouchableOpacity
          style={StoreStyles.imageButton}
          onPress={handleImagePick}
        >
          <Text style={StoreStyles.imageButtonText}>
            {image ? "Change Image" : "Select Image"}
          </Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={StoreStyles.imagePreview} />
        )}

        <Text style={StoreStyles.label}>Search for a Location</Text>
        <View style={StoreStyles.searchContainer}>
          <TextInput
            style={StoreStyles.searchInput}
            placeholder="Enter a place, e.g., Casablanca"
            value={searchPlace}
            onChangeText={setSearchPlace}
          />
          <TouchableOpacity
            style={StoreStyles.searchButton}
            onPress={handleSearch}
          >
            <Text style={StoreStyles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={StoreStyles.label}>Select Store Location</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1E88E5" />
        ) : (
          <MapView
            style={StoreStyles.map}
            region={mapRegion}
            onPress={(event) =>
              setSelectedLocation(event.nativeEvent.coordinate)
            }
          >
            {selectedLocation && <Marker coordinate={selectedLocation} />}
          </MapView>
        )}

        <TouchableOpacity
          style={StoreStyles.createButton}
          onPress={handleCreateStore}
        >
          <Text style={StoreStyles.createButtonText}>Create Store</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StoreScreen;
