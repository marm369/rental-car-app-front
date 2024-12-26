import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const brands = [
  { id: 1, name: 'BMW', logo: '/placeholder.svg' },
  { id: 2, name: 'Toyota', logo: '/placeholder.svg' },
  { id: 3, name: 'Mercedes', logo: '/placeholder.svg' },
  { id: 4, name: 'Tesla', logo: '/placeholder.svg' },
];

export const Brands = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Brands</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {brands.map((brand) => (
          <View key={brand.id} style={styles.brandItem}>
            <Image
              source={{ uri: brand.logo }}
              style={styles.brandLogo}
            />
            <Text style={styles.brandName}>{brand.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    color: '#0066FF',
    fontSize: 14,
  },
  brandItem: {
    alignItems: 'center',
    marginRight: 24,
    marginLeft: 16,
  },
  brandLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 4,
  },
  brandName: {
    fontSize: 12,
    color: '#666',
  },
});

