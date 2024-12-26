import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Texts from "../../../../utils/constants/Texts";
import Images from "../../../../utils/constants/Images";
import ContainerStyles from "../../../../common/styles/containers/ContainerStyles";
import TextsStyles from "../../../../common/styles/texts/TextsStlyes";
const LoginScreen = () => {
  const containerStyles = ContainerStyles();
  const titleTextStyles = TextsStyles({
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 30,
  });
  const subTitleTextStyles = TextsStyles({
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    paddingLeft: 30,
  });
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const textLogo =
    colorScheme === "dark" ? Images.darkTextLogo : Images.lightTextLogo;

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSignIn = () => {
    navigation.navigate("BottomNavigationBar");
  };
  const handleCreateAccount = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={containerStyles.container}>
      <Text style={titleTextStyles.title}>{Texts.loginTitle}</Text>
      <Text style={subTitleTextStyles.title}>{Texts.loginSubTitle}</Text>

      <View style={styles.space}>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#888" style={styles.iconLeft} />
          <TextInput
            style={styles.input}
            placeholder="E-Mail or Username"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon
            name="password"
            size={20}
            color="#888"
            style={styles.iconLeft}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconRight}
          >
            <Icon
              name={secureTextEntry ? "visibility-off" : "visibility"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rememberMeContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo1: {
    width: 120,
    height: 120,
    paddingTop: 50,
    marginTop: 50,
    marginLeft: 20,
  },
  logo2: {
    width: 180,
    height: 180,
    paddingTop: 0,
    marginTop: -120,
    marginLeft: 140,
  },
  space: {
    marginHorizontal: 20,
    marginVertical: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    paddingLeft: 10,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#5C9DED",
  },
  signInButton: {
    backgroundColor: "#5C9DED",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  signInText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: "#5C9DED",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 16,
    color: "#5C9DED",
    fontWeight: "bold",
  },
});

export default LoginScreen;
