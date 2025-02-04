import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../config/config";

export const handleLoginRequest = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem("username", payload.username);
      await AsyncStorage.setItem("userId", String(result.user.id));
      await AsyncStorage.setItem("role", result.user.role);
      return { success: true, data: result };
    } else {
      // Gérer les erreurs retournées par le serveur
      return { success: false, message: result.message || "Login failed." };
    }
  } catch (error) {
    console.error("Error during login:", error);

    // Gérer les erreurs côté client
    return { success: false, message: "An error occurred during login." };
  }
};
