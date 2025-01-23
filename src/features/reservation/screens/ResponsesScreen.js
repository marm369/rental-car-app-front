import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResponsesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur ResponsesScreen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Couleur de fond
  },
  text: {
    fontSize: 18,
    color: '#333', // Couleur du texte
    textAlign: 'center',
  },
});

export default ResponsesScreen;
