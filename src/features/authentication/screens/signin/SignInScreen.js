import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Texts from "../../../../utils/constants/Texts";
import ContainerStyles from "../../../../common/styles/containers/ContainerStyles";
import TextsStyles from "../../../../common/styles/texts/TextsStlyes";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [role, setRole] = useState(""); // Role state

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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

  return (
    <View style={containerStyles.container}>
      <View style={styles.textSpace}>
        <Text style={titleTextStyles.title}>{Texts.loginTitle}</Text>
        <Text style={subTitleTextStyles.title}>{Texts.loginSubTitle}</Text>
      </View>
      <View style={styles.space}>
        {/* Image Upload */}
        <TouchableOpacity style={styles.imageUpload}>
          <Icon name="camera-alt" size={40} color="#888" />
          <Text style={styles.uploadText}>Upload Profile Image</Text>
        </TouchableOpacity>

        {/* First Name */}
        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#888" style={styles.iconLeft} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#888"
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#888" style={styles.iconLeft} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#888"
          />
        </View>

        {/* Username */}
        <View style={styles.inputWrapper}>
          <Icon
            name="person-outline"
            size={20}
            color="#888"
            style={styles.iconLeft}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
          />
        </View>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#888" style={styles.iconLeft} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#888" style={styles.iconLeft} />
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

        {/* Confirm Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#888" style={styles.iconLeft} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry={true}
          />
        </View>

        {/* Role Selection */}
        <View>
          <Text style={styles.label}>Select your role:</Text>

          {/* Radio Button for Renting Cars */}
          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => setRole("renter")}
          >
            <View style={styles.radioCircle}>
              {role === "renter" && <View style={styles.selectedCircle} />}
            </View>
            <Text style={styles.radioLabel}>I want to rent cars</Text>
          </TouchableOpacity>

          {/* Radio Button for Renting Out Cars */}
          <TouchableOpacity
            style={styles.radioButtonContainer}
            onPress={() => setRole("owner")}
          >
            <View style={styles.radioCircle}>
              {role === "owner" && <View style={styles.selectedCircle} />}
            </View>
            <Text style={styles.radioLabel}>I rent out cars</Text>
          </TouchableOpacity>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    marginHorizontal: 20,
  },
  textSpace: {
    marginTop: 100,
    marginBottom: 30,
  },
  imageUpload: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    color: "#888",
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#5C9DED",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#5C9DED",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  createAccountButton: {
    backgroundColor: "#5C9DED",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SignInScreen;
