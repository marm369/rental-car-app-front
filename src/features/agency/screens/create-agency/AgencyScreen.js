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
import AgencyStyles from "./AgencyStyles";
import AgencyController from "../../controllers/AgencyController";

const AgencyScreen = ({ navigation }) => {
  const {
    agencyName,
    setAgencyName,
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
    handleCreateAgency, // Original create agency function
  } = AgencyController();

  const handleCreateAgencyAndNavigate = async () => {
    try {
      await handleCreateAgency();
    } catch (error) {
      console.error("Error creating agency:", error);
    }
  };

  return (
    <ScrollView style={AgencyStyles.container}>
      {/* Header */}
      <View style={AgencyStyles.header}>
        <Text style={AgencyStyles.title}>Create Agency</Text>
        <Text style={AgencyStyles.subtitle}>
          Fill in the details below to create your market.
        </Text>
      </View>

      {/* Form Section */}
      <View style={AgencyStyles.formContainer}>
        <Text style={AgencyStyles.label}>Agency Name</Text>
        <TextInput
          style={AgencyStyles.input}
          placeholder="Enter Agency Name"
          value={agencyName}
          onChangeText={setAgencyName}
        />

        <Text style={AgencyStyles.label}>Description</Text>
        <TextInput
          style={[AgencyStyles.input, AgencyStyles.textArea]}
          placeholder="Enter Agency Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={AgencyStyles.label}>Phone Number</Text>
        <TextInput
          style={AgencyStyles.input}
          placeholder="Enter Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={AgencyStyles.label}>Agency Image</Text>
        <TouchableOpacity
          style={AgencyStyles.imageButton}
          onPress={handleImagePick}
        >
          <Text style={AgencyStyles.imageButtonText}>
            {image ? "Change Image" : "Select Image"}
          </Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={AgencyStyles.imagePreview} />
        )}

        <Text style={AgencyStyles.label}>Search for a Location</Text>
        <View style={AgencyStyles.searchContainer}>
          <TextInput
            style={AgencyStyles.searchInput}
            placeholder="Enter a place, e.g., Casablanca"
            value={searchPlace}
            onChangeText={setSearchPlace}
          />
          <TouchableOpacity
            style={AgencyStyles.searchButton}
            onPress={handleSearch}
          >
            <Text style={AgencyStyles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={AgencyStyles.label}>Select Agency Location</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1E88E5" />
        ) : (
          <MapView
            style={AgencyStyles.map}
            region={mapRegion}
            onPress={(event) =>
              setSelectedLocation(event.nativeEvent.coordinate)
            }
          >
            {selectedLocation && <Marker coordinate={selectedLocation} />}
          </MapView>
        )}

        <TouchableOpacity
          style={AgencyStyles.createButton}
          onPress={handleCreateAgencyAndNavigate}
        >
          <Text style={AgencyStyles.createButtonText}>Create Agency</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AgencyScreen;
