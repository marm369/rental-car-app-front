import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../authentication/screens/onboarding/OnboardingScreen";
import LoginScreen from "../authentication/screens/login/LoginScreen";
import BottomNavigationBar from "../navigation/BottomNavigationBar";
import SignUpScreen from "../authentication/screens/signup/SignUpScreen";
import SuccessScreen from "../../common/components/SuccessScreen";
import StoreDetailsScreen from "../geolocalisation/screens/StoreDetailsScreen";
import AddCarScreen from "../store/screens/add-car/AddCarScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="BottomNavigationBar"
          component={BottomNavigationBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCar"
          component={AddCarScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="StoreDetails"
          component={StoreDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
