import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Texts from "../../../../utils/constants/Texts";
import Images from "../../../../utils/constants/Images";
import LoginController from "../../controllers/LoginController";
import LoginStyles from "./LoginStyles";

const LoginScreen = () => {
  const {
    formValues,
    handleInputChange,
    secureTextEntry,
    togglePasswordVisibility,
    handleSignIn,
    handleCreateAccount,
    errors,
  } = LoginController();

  const colorScheme = useColorScheme();
  const textLogo =
    colorScheme === "dark" ? Images.darkTextLogo : Images.lightTextLogo;

  return (
    <View style={LoginStyles.container}>
      <Image
        source={Images.imageLogo}
        style={LoginStyles.logo1}
        resizeMode="contain"
      />

      <Image source={textLogo} style={LoginStyles.logo2} resizeMode="contain" />

      <Text style={LoginStyles.title}>{Texts.loginTitle}</Text>
      <Text style={LoginStyles.subTitle}>{Texts.loginSubTitle}</Text>

      <View style={LoginStyles.space}>
        <View style={LoginStyles.inputWrapper}>
          <Icon
            name="email"
            size={20}
            color="#888"
            style={LoginStyles.iconLeft}
          />
          <TextInput
            style={LoginStyles.input}
            placeholder="E-Mail or Username"
            placeholderTextColor="#888"
            value={formValues.username}
            onChangeText={(text) => handleInputChange("username", text)}
          />
        </View>

        {errors.username && (
          <Text style={{ color: "red" }}>{errors.username}</Text>
        )}

        <View style={LoginStyles.inputWrapper}>
          <Icon
            name="lock"
            size={20}
            color="#888"
            style={LoginStyles.iconLeft}
          />
          <TextInput
            style={LoginStyles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={secureTextEntry}
            value={formValues.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={LoginStyles.iconRight}
          >
            <Icon
              name={secureTextEntry ? "visibility-off" : "visibility"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password}</Text>
        )}

        <View style={LoginStyles.rememberMeContainer}>
          <TouchableOpacity>
            <Text style={LoginStyles.forgotPasswordText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={LoginStyles.signInButton}
          onPress={handleSignIn}
        >
          <Text style={LoginStyles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={LoginStyles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={LoginStyles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
