import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Récupération des params
  const { imageSource, navigateTo, title, subTitle } = route.params || {};

  const handleNavigation = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <View style={styles.container}>
      {/* Rounded Image Container */}
      {imageSource && (
        <View style={styles.imageBackground}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        </View>
      )}

      {/* Success Message */}
      {title && <Text style={styles.title}>{title}</Text>}
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}

      {/* Button to navigate */}
      <TouchableOpacity style={styles.button} onPress={handleNavigation}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD", // Light blue background
    padding: 20,
  },
  imageBackground: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(33, 150, 243, 0.3)", // Transparent blue
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2196F3", // Blue for title
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2196F3", // Blue for button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SuccessScreen;
