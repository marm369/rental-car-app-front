import { Alert } from "react-native";

export const handleCreateAccountRequest = async (formValues) => {
  try {
    /*
    const endpoint = "http://192.168.27.154:5000/api/Authentication/register";

    // Création du payload avec les propriétés nécessaires
    const payload = {
      image: formValues.profileImage,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phoneNumber,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      role: formValues.role,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    */
    //response.ok
    const result = true;
    if (true) {
      return result;
    } else {
      Alert.alert("Error", result.message || "Failed to create account.");
      return null;
    }
  } catch (error) {
    console.error("Error creating account:", error);
    Alert.alert(
      "Error",
      "An error occurred while creating the account. Please try again."
    );
    return null;
  }
};
