import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../authentication/screens/onboarding/OnboardingScreen";
import LoginScreen from "../authentication/screens/login/LoginScreen";
import BottomNavigationBar from "./BottomNavigationBar";
import SignInScreen from "../authentication/screens/signin/SignInScreen"
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
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
