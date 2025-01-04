import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const StoreService = {
  async searchPlace(searchPlace, setSelectedLocation, setMapRegion) {
    if (!searchPlace.trim()) {
      Alert.alert("Error", "Please enter a location to search!");
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      searchPlace
    )}&format=json&addressdetails=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        Alert.alert("Error", "Unable to connect to the search service.");
        return;
      }

      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setSelectedLocation(newLocation);
        setMapRegion(newLocation);
      } else {
        Alert.alert("Error", "Location not found.");
      }
    } catch (error) {
      Alert.alert("Error", `An error occurred: ${error.message}`);
    }
  },

  async createStore(storeData) {
    if (
      !storeData.storeName ||
      !storeData.description ||
      !storeData.phone ||
      !storeData.selectedLocation ||
      !storeData.image
    ) {
      Alert.alert("Error", "Please fill all the fields and select an image!");
      return false;
    }

    try {
        /*
      const username = await AsyncStorage.getItem("username");
      if (!username) {
        Alert.alert("Error", "Unable to find username in local storage!");
        return false;
      }

      const payload = {
        name: storeData.storeName,
        owner: username,
        description: storeData.description,
        phoneNumber: storeData.phone,
        longitude: storeData.selectedLocation.longitude,
        latitude: storeData.selectedLocation.latitude,
        image: storeData.image,
      };
*/
      // Simulate successful response
      return true;
    } catch (error) {
      Alert.alert("Error", `An error occurred: ${error.message}`);
      return false;
    }
  },
};

export default StoreService;
