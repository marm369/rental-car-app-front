import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MapPin, Bell, Search, SlidersHorizontal } from 'lucide-react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <MapPin size={20} color="#000" />
        <Text style={styles.locationText}>New York, USA</Text>
      </View>
      <Bell size={20} color="#000" />
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#fff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0066FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: '#0052CC',
    padding: 8,
    borderRadius: 8,
  },
});

