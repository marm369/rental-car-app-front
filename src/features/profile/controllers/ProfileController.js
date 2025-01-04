import { useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileService from "../services/ProfileService";
import { useNavigation } from "@react-navigation/native";

const ProfileController = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        if (!username) {
          Alert.alert("Error", "No username found. Please log in again.");
          navigation.navigate("Login");
          return;
        }

        const data = await ProfileService.getUserInfo(username);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        Alert.alert("Error", "Failed to load user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("username");
    navigation.navigate("Login");
  };

  return { userInfo, loading, handleLogout };
};

export default ProfileController;
