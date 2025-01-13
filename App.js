import React from "react";
import "react-native-gesture-handler";
import  FilterBar  from "./src/features/home/screens/home-components/FilterBar";
import  HomeScreen  from "./src/features/home/screens/HomeScreen";
import AppNavigation from "./src/features/navigation/AppNavigation";
import  ChatScreen from "./src/features/home/screens/home-components/Chat";

export default function App() {
  return  <AppNavigation />;
}