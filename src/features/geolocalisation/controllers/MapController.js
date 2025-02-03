import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AgencyService from "../../agency/services/AgencyService";

export const useMapController = () => {
  const [agencies, setAgencies] = useState([]);
  const [region, setRegion] = useState(null);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAgencies();
    getCurrentLocation();
  }, []);

  const fetchAgencies = async () => {
    try {
      const fetchedAgencies = await AgencyService.getAgencies();
      setAgencies(fetchedAgencies);
    } catch (error) {
      console.error("Error fetching agencies:", error);
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleMarkerPress = (agency) => {
    setSelectedAgency(agency);
  };

  const handleSearch = async () => {
    try {
      const result = await Location.geocodeAsync(searchQuery);
      if (result.length > 0) {
        setRegion({
          latitude: result[0].latitude,
          longitude: result[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return {
    agencies,
    region,
    selectedAgency,
    searchQuery,
    setSearchQuery,
    handleMarkerPress,
    handleSearch,
  };
};
