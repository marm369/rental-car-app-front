import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleLoginRequest = async (payload) => {
  const endpoint = "http://192.168.27.154:5000/api/Authentication/login";

  try {
    /*
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    */
    const result = true;
    if (true) {
      //await AsyncStorage.setItem("username", payload.userName);
      return { success: true, data: result };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "An error occurred during login." };
  }
};
