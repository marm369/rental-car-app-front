import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const stores = [
  {
    id: 1,
    name: "Store A",
    latitude: 33.6985,
    longitude: -7.402,
    image: require("../../../../assets/cars/store.png"),
  },
  {
    id: 2,
    name: "Store B",
    latitude: 33.7,
    longitude: -7.4005,
    image: require("../../../../assets/cars/store.png"),
  },
  {
    id: 3,
    name: "Store C",
    latitude: 33.695,
    longitude: -7.405,
    image: require("../../../../assets/cars/store.png"),
  },
];

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const animatedRegion = useRef(
    new AnimatedRegion({
      latitude: 33.697904,
      longitude: -7.4019606,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  ).current;

  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleGetLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      animatedRegion
        .timing({
          latitude,
          longitude,
        })
        .start();

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

  const handleMarkerPress = (store) => {
    navigation.navigate("StoreDetails", { store });
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

        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            onPress={() => handleMarkerPress(store)}
          >
            <Image source={store.image} style={styles.storeIcon} />
          </Marker>
        ))}
      </MapView>
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

  storeIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default MapScreen;
