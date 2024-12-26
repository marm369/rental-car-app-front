import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';

const brands = [
  { id: 1, name: 'BMW', icon: '🚗' },
  { id: 2, name: 'Mercedes', icon: '🚙' },
  { id: 3, name: 'Audi', icon: '🚘' },
];

const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
const fuelTypes = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const colors = ['Noir', 'Blanc', 'Rouge', 'Bleu', 'Gris'];

export const FilterBar = () => {
  const [showBrands, setShowBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Brands Dropdown */}
        <View style={styles.filterGroup}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowBrands(!showBrands)}
          >
            <Text>{selectedBrand || 'Marque'}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
          {showBrands && (
            <View style={styles.dropdownContent}>
              {brands.map((brand) => (
                <TouchableOpacity
                  key={brand.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedBrand(brand.name);
                    setShowBrands(false);
                  }}
                >
                  <Text>{brand.icon}</Text>
                  <Text>{brand.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Year Filter */}
        <View style={styles.filterGroup}>
          <TouchableOpacity style={styles.dropdown}>
            <Text>{selectedYear || 'Année'}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Fuel Type Filter */}
        <View style={styles.filterGroup}>
          <TouchableOpacity style={styles.dropdown}>
            <Text>{selectedFuel || 'Carburant'}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Color Filter */}
        <View style={styles.filterGroup}>
          <TouchableOpacity style={styles.dropdown}>
            <Text>{selectedColor || 'Couleur'}</Text>
            <ChevronDown size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Sort Price */}
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortAscending(!sortAscending)}
        >
          <Text>Prix {sortAscending ? '↑' : '↓'}</Text>
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
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterGroup: {
    marginRight: 12,
    position: 'relative',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    minWidth: 120,
    gap: 8,
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: '#0066FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

