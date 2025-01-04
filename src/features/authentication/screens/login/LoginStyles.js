import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo1: {
    width: 120,
    height: 120,
    marginTop: 50,
    marginLeft: 20,
    top: 25,
  },
  logo2: {
    width: 180,
    height: 180,
    marginTop: -120,
    marginLeft: 140,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 30,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
    paddingLeft: 30,
    marginBottom: 40,
  },
  space: {
    marginHorizontal: 30,
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

export default LoginStyles;
