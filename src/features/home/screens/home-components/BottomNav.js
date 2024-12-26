import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Home, Search, Heart, Settings, User } from 'lucide-react-native';

export const BottomNav = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navItem}>
        <Home size={24} color="#0066FF" />
        <Text style={[styles.navText, styles.activeText]}>Home</Text>
      </View>
      <View style={styles.navItem}>
        <Search size={24} color="#666" />
        <Text style={styles.navText}>Explore</Text>
      </View>
      <View style={styles.navItem}>
        <Heart size={24} color="#666" />
        <Text style={styles.navText}>Favorites</Text>
      </View>
      <View style={styles.navItem}>
        <Settings size={24} color="#666" />
        <Text style={styles.navText}>Settings</Text>
      </View>
      <View style={styles.navItem}>
        <User size={24} color="#666" />
        <Text style={styles.navText}>Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeText: {
    color: '#0066FF',
  },
});

