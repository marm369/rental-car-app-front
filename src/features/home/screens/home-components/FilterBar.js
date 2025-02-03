import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { FilterService } from "../../service/FilterService";
import { AntDesign } from "@expo/vector-icons";

const FilterBar = ({ onFilterApply, onResetFilters }) => {
  const [filters, setFilters] = useState({
    categories: [],
    fuelTypes: [],
    colors: [],
    years: [],
    brands: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    fuel: null,
    color: null,
    year: null,
    brand: null,
    priceSort: "desc",
  });

  const [isLoading, setIsLoading] = useState(true);

  const formatData = useCallback(
    (data) =>
      data.map((item) => ({ label: item.toString(), value: item.toString() })),
    []
  );

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await FilterService.getFilterOptions();
        setFilters({
          categories: formatData(options.categories || []),
          fuelTypes: formatData(options.fuelTypes || []),
          colors: formatData(options.colors || []),
          years: formatData(options.years || []),
          brands: formatData(options.brands || []),
        });
      } catch (error) {
        console.error("Error loading filters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilterOptions();
  }, [formatData]);

  const handleApplyFilters = () => {
    if (onFilterApply) {
      onFilterApply(selectedFilters);
    }
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      category: null,
      fuel: null,
      color: null,
      year: null,
      brand: null,
      priceSort: "desc",
    });
    if (onResetFilters) onResetFilters();
  };

  const togglePriceSort = () => {
    setSelectedFilters((prev) => ({
      ...prev,
      priceSort: prev.priceSort === "asc" ? "desc" : "asc",
    }));
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterContainer}>
          <DropdownComponent
            data={filters.categories}
            label="Category"
            value={selectedFilters.category}
            onChange={(item) =>
              setSelectedFilters({ ...selectedFilters, category: item.value })
            }
            renderItem={renderItem}
          />
          <DropdownComponent
            data={filters.fuelTypes}
            label="Fuel Type"
            value={selectedFilters.fuel}
            onChange={(item) =>
              setSelectedFilters({ ...selectedFilters, fuel: item.value })
            }
            renderItem={renderItem}
          />
          <DropdownComponent
            data={filters.colors}
            label="Color"
            value={selectedFilters.color}
            onChange={(item) =>
              setSelectedFilters({ ...selectedFilters, color: item.value })
            }
            renderItem={renderItem}
          />
          <DropdownComponent
            data={filters.years}
            label="Year"
            value={selectedFilters.year}
            onChange={(item) =>
              setSelectedFilters({ ...selectedFilters, year: item.value })
            }
            renderItem={renderItem}
          />
          <DropdownComponent
            data={filters.brands}
            label="Brand"
            value={selectedFilters.brand}
            onChange={(item) =>
              setSelectedFilters({ ...selectedFilters, brand: item.value })
            }
            renderItem={renderItem}
          />
          <TouchableOpacity
            style={styles.priceSortButton}
            onPress={togglePriceSort}
          >
            <Text style={styles.priceSortText}>Price</Text>
            <AntDesign
              name={
                selectedFilters.priceSort === "asc" ? "arrowup" : "arrowdown"
              }
              size={16}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleApplyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleResetFilters}>
          <Text style={styles.buttonText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DropdownComponent = ({ data, label, value, onChange, renderItem }) => (
  <View style={styles.dropdownContainer}>
    <Text style={styles.dropdownLabel}>{label}</Text>
    <Dropdown
      style={styles.dropdown}
      data={data}
      search
      searchPlaceholder="Search..."
      labelField="label"
      valueField="value"
      placeholder={`Select ${label}`}
      value={value}
      onChange={onChange}
      renderItem={renderItem}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropdownContainer: {
    width: 150,
    marginRight: 10,
    marginBottom: 10,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  dropdown: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 10,
    height: 50,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  item: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  priceSortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  priceSortText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
    color: "#333",
  },
});

export default FilterBar;
