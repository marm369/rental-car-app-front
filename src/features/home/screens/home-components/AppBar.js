import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Bell, MessageCircle } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProfileController from "../../../profile/controllers/ProfileController.js";

import ChatScreen from "./Chat.js";

export const AppBar = ({ onNotificationPress }) => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const { userInfo } = ProfileController();
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername); 
        }
      } catch (error) {
        console.error("Error retrieving username from storage:", error);
      }
    };
    fetchUsername();
  }, []); 

  const handleMessagePress = () => {
    navigation.navigate("ChatScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userInfo?.picture }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{username}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={handleMessagePress}
          style={styles.iconButton}
        >
          <MessageCircle size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.iconButton}
        >
          <Bell size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
});
