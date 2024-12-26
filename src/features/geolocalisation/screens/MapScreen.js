import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps"; 
import * as Location from "expo-location";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); 
  const animatedRegion = useRef(
    new AnimatedRegion({
      latitude: 33.697904, 
      longitude: -7.4019606,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  ).current;

  const handleGetLocation = async () => {
    try {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

  
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

     
      animatedRegion.timing({
        latitude,
        longitude,
      }).start();


      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000 
      );

      setLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error fetching location: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 33.697904,
          longitude: -7.4019606,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >

        {location && (
          <Marker.Animated
            coordinate={animatedRegion}
            title="Vous êtes ici"
            description="Ceci est votre position actuelle"
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
        <Text style={styles.buttonText}>Locate Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -75 }],
    backgroundColor: "#4e73df",
    padding: 15,
    borderRadius: 8,
    width: 150,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MapScreen;
