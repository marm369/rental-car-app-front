import { useState, useEffect, useCallback } from "react";
import { CarService } from "../services/CarService";
import CarModel from "../models/CarModel";
import AgencyService from "../../agency/services/AgencyService";

export const useCarController = (initialAgencyId) => {
  const [brands, setBrands] = useState([]);
  const [carTypes, setCarTypes] = useState({
    carCategories: [],
    fuelTypes: [],
  });
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [carData, setCarData] = useState({
    ...CarModel,
    agencyId: initialAgencyId,
  });
  const [isAgencyIdLoading, setIsAgencyIdLoading] = useState(!initialAgencyId);
  const [agencyInfo, setAgencyInfo] = useState({ name: "", imageBase64: "" });

  const fetchAgencyInfo = useCallback(async () => {
    try {
      const info = await AgencyService.getAgencyInfo();
      setAgencyInfo(info);
    } catch (error) {
      console.error("Error fetching agency info:", error);
    }
  }, []);
  useEffect(() => {
    if (!initialAgencyId) {
      fetchAgencyId(); // Fetch agencyId only if not provided
    } else {
      setCarData((prevData) => ({ ...prevData, agencyId: initialAgencyId }));
    }
    fetchBrands();
    fetchCarTypes();
    fetchAgencyInfo();
  }, [fetchAgencyInfo]);

  const fetchAgencyId = async () => {
    try {
      setIsAgencyIdLoading(true);
      const agencyId = await CarService.getAgencyId(); // Make an API call to get agencyId
      setCarData((prevData) => ({ ...prevData, agencyId }));
    } catch (error) {
      console.error("Error fetching agency ID:", error);
    } finally {
      setIsAgencyIdLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const fetchedBrands = await CarService.getAllBrands();
      setBrands(fetchedBrands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchCarTypes = async () => {
    try {
      const fetchedCarTypes = await CarService.getCarTypes();
      setCarTypes(fetchedCarTypes);
    } catch (error) {
      console.error("Error fetching car types:", error);
    }
  };

  const handleBrandChange = (brandId) => {
    const brand = brands.find((b) => b.id === parseInt(brandId));
    setSelectedBrand(brand);
    setCarData((prevData) => ({ ...prevData, modelId: "" }));
  };

  const handleModelChange = (modelId) => {
    setCarData((prevData) => ({ ...prevData, modelId }));
  };

  const handleInputChange = (name, value) => {
    setCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddCar = async () => {
    try {
      await CarService.addCar(carData);
      return true;
    } catch (error) {
      console.error("Error adding car:", error);
      throw error;
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await CarService.deleteCar(carId);
      return true;
    } catch (error) {
      console.error("Error deleting car:", error);
      throw error;
    }
  };


  return {
    brands,
    carTypes,
    selectedBrand,
    carData,
    isAgencyIdLoading,
    handleBrandChange,
    handleModelChange,
    handleInputChange,
    handleAddCar,
    handleDeleteCar,
    agencyInfo,
    fetchAgencyInfo,
  };
};
