import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

// Types de voitures avec icônes
const carTypes = [
  { id: 1, name: "Family", icon: "👨‍👩‍👧‍👦" },
  { id: 2, name: "City", icon: "🏙️" },
  { id: 3, name: "Sport", icon: "🏎️" },
  { id: 4, name: "Classic", icon: "🚘" },
  { id: 5, name: "Luxury", icon: "💎" },
  { id: 6, name: "Trip", icon: "🚐" },
  { id: 7, name: "Electric", icon: "⚡" },
  { id: 8, name: "Off-Road", icon: "🚙" },
];

// Types de carburants
const fuelTypes = ["Essence", "Diesel", "Electric", "Hybrid", "Hydrogène"];

const brands = [
  { id: 1, name: "BMW" },
  { id: 2, name: "Mercedes" },
  { id: 3, name: "Audi" },
];

const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
const colors = ["Noir", "Blanc", "Rouge", "Bleu", "Gris"];

export const FilterBar = () => {
  const [selectedDropdown, setSelectedDropdown] = useState(null); // Un seul état pour gérer les listes déroulantes ouvertes
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  const toggleDropdown = (dropdownName) => {
    setSelectedDropdown((prev) =>
      prev === dropdownName ? null : dropdownName
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Brands Dropdown */}
        <View style={styles.filterGroup}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown("brands")}
          >
            <Text>{selectedBrand || "Marque"}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
          {selectedDropdown === "brands" && (
            <View style={styles.dropdownContent}>
              {brands.map((brand) => (
                <TouchableOpacity
                  key={brand.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedBrand(brand.name);
                    setSelectedDropdown(null);
                  }}
                >
                  <Text>{brand.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Car Types Dropdown */}
        <View style={styles.filterGroup}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown("carTypes")}
          >
            <Text>{selectedType || "Type"}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
          {selectedDropdown === "carTypes" && (
            <View style={styles.dropdownContent}>
              {carTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedType(type.name);
                    setSelectedDropdown(null);
                  }}
                >
                  <Text>{type.icon}</Text>
                  <Text>{type.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Year Filter */}
        <View style={styles.filterGroup}>
          <TouchableOpacity style={styles.dropdown}>
            <Text>{selectedYear || "Année"}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Fuel Type Dropdown */}
        <View style={styles.filterGroup}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => toggleDropdown("fuelTypes")}
          >
            <Text>{selectedFuel || "Carburant"}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
          {selectedDropdown === "fuelTypes" && (
            <View style={styles.dropdownContent}>
              {fuelTypes.map((fuel, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedFuel(fuel);
                    setSelectedDropdown(null);
                  }}
                >
                  <Text>{fuel}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Color Filter */}
        <View style={styles.filterGroup}>
          <TouchableOpacity style={styles.dropdown}>
            <Text>{selectedColor || "Couleur"}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Sort Price */}
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortAscending(!sortAscending)}
        >
          <Text>Prix {sortAscending ? "↑" : "↓"}</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Appliquer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterGroup: {
    marginRight: 12,
    position: "relative",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    minWidth: 120,
    gap: 8,
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: "#0066FF",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
