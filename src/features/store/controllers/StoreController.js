import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import StoreService from "../services/StoreService";
import { useNavigation } from "@react-navigation/native";

const StoreController = () => {
  const navigation = useNavigation();
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
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
    })();
  }, []);

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
    await StoreService.searchPlace(
      searchPlace,
      setSelectedLocation,
      setMapRegion
    );
  };

  const handleCreateStore = async () => {
    const result = await StoreService.createStore({
      storeName,
      description,
      phone,
      selectedLocation,
      image,
    });

    if (result) {
      navigation.navigate("SuccessScreen", {
        imageSource: require("../../../../assets/images/store-created.jpeg"),
        title: "Store Created!",
        subTitle: "Your store has been successfully created.",
        navigateTo: "AddCar",
      });
    }
  };

  return {
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
  };
};

export default StoreController;
