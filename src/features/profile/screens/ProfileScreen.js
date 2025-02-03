import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import ProfileController from "../controllers/ProfileController";
import ProfileStyles from "./ProfileStyles";

const ProfileScreen = () => {
  const { userInfo, loading, handleLogout } = ProfileController();

  if (loading) {
    return (
      <View style={ProfileStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FB923C" />
        <Text style={ProfileStyles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={ProfileStyles.container}>
      {/* Header Section */}
      <View style={ProfileStyles.header}>
        <Image
          source={{
            uri: userInfo?.picture || "https://via.placeholder.com/150",
          }}
          style={ProfileStyles.profileImage}
        />
      </View>

      {/* Profile Details */}
      <View style={ProfileStyles.infoSection}>
        <Text style={ProfileStyles.infoTitle}>Personal Information</Text>
        <View style={ProfileStyles.infoRow}>
          <MaterialIcons name="person" size={24} color="#1E90FF" />
          <Text style={ProfileStyles.infoText}>
            {userInfo?.firstName || "N/A"} {userInfo?.lastName || "N/A"}
          </Text>
        </View>

        <View style={ProfileStyles.infoRow}>
          <MaterialIcons name="email" size={24} color="#1E90FF" />
          <Text style={ProfileStyles.infoText}>{userInfo?.email || "N/A"}</Text>
        </View>

        <View style={ProfileStyles.infoRow}>
          <MaterialIcons name="phone" size={24} color="#1E90FF" />
          <Text style={ProfileStyles.infoText}>
            {userInfo?.phoneNumber || "N/A"}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={ProfileStyles.logoutButton}
        onPress={handleLogout}
      >
        <Feather name="log-out" size={18} color="#FFF" />
        <Text style={ProfileStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
