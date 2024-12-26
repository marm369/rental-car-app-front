import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Heart, Users, Gauge, GasPump } from 'lucide-react-native';

export const PopularCar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Car</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <View style={styles.carCard}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ 4.8</Text>
          <Heart size={20} color="#FF4444" fill="#FF4444" />
        </View>
        <Image
          source={{ uri: '/placeholder.svg' }}
          style={styles.carImage}
        />
        <Text style={styles.carName}>Hyundai Verna</Text>
        <Text style={styles.price}>$25.00<Text style={styles.perDay}>/hr</Text></Text>
        <View style={styles.specifications}>
          <View style={styles.specItem}>
            <Gauge size={16} color="#666" />
            <Text style={styles.specText}>Manual</Text>
          </View>
          <View style={styles.specItem}>
            <GasPump size={16} color="#666" />
            <Text style={styles.specText}>Petrol</Text>
          </View>
          <View style={styles.specItem}>
            <Users size={16} color="#666" />
            <Text style={styles.specText}>5 Seats</Text>
          </View>
        </View>
      </View>
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
  carCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    color: '#666',
    fontSize: 14,
  },
  carImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  carName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066FF',
    marginBottom: 8,
  },
  perDay: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  specifications: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    color: '#666',
    fontSize: 12,
  },
});

