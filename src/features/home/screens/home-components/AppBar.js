import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';

export const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: '/placeholder.svg' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>
      <Bell size={24} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
});

