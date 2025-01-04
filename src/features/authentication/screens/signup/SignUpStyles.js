import { StyleSheet } from "react-native";

const SignUpStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    textSpace: {
      marginTop: 20,
      marginBottom: 20,
    },
  
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
    },
    subTitle: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
    },
    space: {
      marginTop: 20,
    },
  
    profileSection: {
      alignItems: "center",
      marginBottom: 20,
    },
    profileIcon: {
      marginBottom: 10,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    profileText: {
      fontSize: 16,
      color: "#666",
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      backgroundColor: "#f9f9f9",
      marginBottom: 10,
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
    errorText: {
      color: "red",
      fontSize: 12,
      marginBottom: 10,
    },
    radioButtonGroup: {
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
      borderColor: "#1E90FF", 
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    selectedCircle: {
      height: 12,
      width: 12,
      borderRadius: 6, 
      backgroundColor: "#1E90FF",
    },
    radioLabel: {
      fontSize: 16,
      color: "#333", 
    },
  
    createAccountButton: {
      backgroundColor: "#1E90FF",
      borderRadius: 8,
      padding: 15,
      alignItems: "center",
    },
    createAccountText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
      backgroundColor: "#F5F5F5",
    },
});

export default SignUpStyles;
