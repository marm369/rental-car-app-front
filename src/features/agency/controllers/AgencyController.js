import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AgencyService from "../services/AgencyService";
import { useNavigation } from "@react-navigation/native";

export const useAgencyController = () => {
  const navigation = useNavigation();
  const [agencyName, setAgencyName] = useState("");
  const [description, setDescription] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState({ name: "", imageBase64: "" });

  const fetchAgencyInfo = useCallback(async () => {
    try {
      const info = await AgencyService.getAgencyInfo();
      setAgencyInfo(info);
    } catch (error) {
      console.error("Error fetching agency info:", error);
    }
  }, []);

  useEffect(() => {
    const initializeLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setMapRegion(currentLocation);
      setLoading(false);
    };

    fetchAgencyInfo();
    initializeLocation();
  }, [fetchAgencyInfo]);

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Camera roll permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(`data:image/png;base64,${base64}`);
    }
  };

  const handleSearch = async () => {
    await AgencyService.searchPlace(
      searchPlace,
      setSelectedLocation,
      setMapRegion
    );
  };

  const handleCreateAgency = async () => {
    try {
      const result = await AgencyService.createAgency({
        agencyName,
        description,
        selectedLocation,
        image,
      });

      if (result && result.id) {
        navigation.navigate("SuccessScreen", {
          imageSource: require("../../../../assets/images/store-created.jpeg"),
          title: "Agency Created!",
          subTitle: "Your agency has been successfully created.",
          navigateTo: "AddCar",
        });
      }
    } catch (error) {
      console.error("Error in handleCreateAgency:", error);
      Alert.alert("Error", "Failed to create agency. Please try again.");
    }
  };

  return {
    agencyName,
    setAgencyName,
    description,
    setDescription,
    searchPlace,
    setSearchPlace,
    image,
    handleImagePick,
    handleSearch,
    mapRegion,
    selectedLocation,
    setSelectedLocation,
    loading,
    handleCreateAgency,
    agencyInfo,
    fetchAgencyInfo,
  };
};
