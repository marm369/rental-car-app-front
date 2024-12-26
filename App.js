import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import AppNavigation from "./src/features/navigation/AppNavigation";
const Stack = createStackNavigator();

export default function App() {
  return (
    <AppNavigation />
  );
}

