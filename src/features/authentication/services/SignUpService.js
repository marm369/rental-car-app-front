import { Alert } from "react-native";
import { endpoint } from '../../../config/config';

export const handleCreateAccountRequest = async (formValues) => {
  try {
    // Endpoint du backend
    const endpoint = 'http://192.168.1.1:3000/users/register';

    // Création du payload avec les propriétés nécessaires
    const payload = {
      username: formValues.username,
      password: formValues.password,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      role: formValues.role,
      picture: formValues.profileImage, // Ajout de la clé 'picture'
    };

    console.log("------------payload------", payload);

    // Requête POST vers le backend
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Traitement de la réponse
    const result = await response.json();

    if (response.ok) {
      // Si la réponse est un succès
      Alert.alert("Success", "Account created successfully!");
      return result;
    } else {
      // En cas d'erreur du backend
      Alert.alert("Error", result.message || "Failed to create account.");
      return null;
    }
  } catch (error) {
    // Gestion des erreurs de requête
    console.error("Error creating account:", error);
    Alert.alert(
      "Error",
      "An error occurred while creating the account. Please try again."
    );
    return null;
  }
};
