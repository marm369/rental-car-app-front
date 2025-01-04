import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const popularCars = [
  {
    id: 1,
    image: require("../../../../../assets/cars/BMWM4.jpeg"),
    model: 'BMW M4',
    year: 2023,
    price: 150,
  },
  {
    id: 2,
    image: require("../../../../../assets/cars/MercedesC300.jpeg"),
    model: 'Mercedes C300',
    year: 2023,
    price: 130,
  },
  {
    id: 3,
    image:require("../../../../../assets/cars/AudiA5.jpeg"),
    model: 'Audi A5',
    year: 2022,
    price: 120,
  },
];

export const PopularCars = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Cars</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {popularCars.map((car) => (
          <View key={car.id} style={styles.carCard}>
            <Image source={car.image} style={styles.carImage} />
            <Text style={styles.model}>{car.model}</Text>
            <Text style={styles.year}>{car.year}</Text>
            <Text style={styles.price}>${car.price}/day</Text>
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  carCard: {
    width: 200,
    marginLeft: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  model: {
    fontSize: 16,
    fontWeight: '600',
  },
  year: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066FF',
  },
});

