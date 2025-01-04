import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../profile/screens/ProfileScreen";
import StoreScreen from "../store/screens/create-store/StoreScreen";
import StoreCarsScreen from "../store/screens/display-cars/StoreCarsScreen";
import HomeScreen from "../home/screens/HomeScreen";
import MapScreen from "../geolocalisation/screens/MapScreen";
import PanierScreen from "../panier/screens/PanierScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function BottomNavigationBar() {
  var isStore = true;
  var isCreated = false;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          const { accessibilityState, children, onPress } = props;
          const isSelected = accessibilityState?.selected;

          // Set custom colors for each tab
          let activeBackgroundColor = "#E5E5E5";
          let activeIconColor = "#000";

          switch (route.name) {
            case "Home":
              activeBackgroundColor = "rgba(30, 144, 255, 0.1)";
              activeIconColor = "#1E90FF";
              break;
            case "Map":
              activeBackgroundColor = "rgba(255, 99, 71, 0.1)";
              activeIconColor = "#FF6347";
              break;
            case "Panier":
              activeBackgroundColor = "rgba(255, 165, 0, 0.1)";
              activeIconColor = "#FFA500";
              break;
            case "Store":
              activeBackgroundColor = "rgba(0, 128, 128, 0.1)";
              activeIconColor = "#008080";
              break;
            case "Profile":
              activeBackgroundColor = "rgba(138, 43, 226, 0.1)";
              activeIconColor = "#8A2BE2";
              break;
          }

          return (
            <TouchableOpacity
              onPress={onPress}
              style={[
                styles.tabButton,
                isSelected ? { backgroundColor: activeBackgroundColor } : null,
              ]}
            >
              {isSelected ? (
                <Ionicons
                  name={
                    route.name === "Home"
                      ? "home"
                      : route.name === "Map"
                      ? "map"
                      : route.name === "Panier"
                      ? "cart"
                      : route.name === "Store"
                      ? "storefront"
                      : "person"
                  }
                  size={22}
                  color={activeIconColor}
                  style={{ fontWeight: "bold" }}
                />
              ) : (
                <Ionicons
                  name={
                    route.name === "Home"
                      ? "home-outline"
                      : route.name === "Map"
                      ? "map-outline"
                      : route.name === "Panier"
                      ? "cart-outline"
                      : route.name === "Store"
                      ? "storefront-outline"
                      : "person-outline"
                  }
                  size={22}
                  color={"#000"}
                />
              )}
              {isSelected && (
                <Text style={[styles.tabText, { color: activeIconColor }]}>
                  {route.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      {isStore ? (
        isCreated ? (
          <Tab.Screen name="Store" component={StoreCarsScreen} />
        ) : (
          <Tab.Screen name="Store" component={StoreScreen} />
        )
      ) : (
        <Tab.Screen name="Panier" component={PanierScreen} />
      )}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabBar: {
    height: 80,
    backgroundColor: "#FDFDFD",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 6,
    marginVertical: 7,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
