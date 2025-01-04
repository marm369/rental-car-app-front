import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { handleLoginRequest } from "../services/LoginService";
import LoginModel from "../models/LoginModel";

const LoginController = () => {
  const [formValues, setFormValues] = useState(LoginModel);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSignIn = async () => {
    if (!formValues.username || !formValues.password) {
      setErrors({
        username: !formValues.username ? "Username is required" : null,
        password: !formValues.password ? "Password is required" : null,
      });
      return;
    }

    const result = await handleLoginRequest(formValues);

    if (result.success) {
      navigation.navigate("BottomNavigationBar");
    } else {
      alert(`Login failed: ${result.message}`);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  return {
    formValues,
    handleInputChange,
    secureTextEntry,
    togglePasswordVisibility,
    handleSignIn,
    handleCreateAccount,
    errors,
  };
};

export default LoginController;
