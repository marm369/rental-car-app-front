import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { AppBar } from  "./home-components/AppBar.js"
import { PopularCars } from "./home-components/PopularCars.js"
import { FilterBar } from "./home-components/FilterBar.js"
import { CarList } from "./home-components/CarList.js";
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
    <AppBar />
    <ScrollView>
      <PopularCars />
      <FilterBar />
      <CarList />
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F9FA",
    },
  });

export default HomeScreen;
