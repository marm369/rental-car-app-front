import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoint } from "../../../config/config";

export const handleLoginRequest = async (payload) => {
  const Endpoint = `${endpoint}/users/login`;

  try {
    const response = await fetch(Endpoint, {
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
      console.log("LogiIn");
      console.log(result.user.role);
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
