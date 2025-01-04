import { StyleSheet } from "react-native";

const StoreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E88E5",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#BBDEFB",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1565C0",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  imageButton: {
    backgroundColor: "#1565C0",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  imageButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#0D47A1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#FFFFFF", // Blanc
    fontSize: 14,
    fontWeight: "600",
  },
  map: {
    height: 250,
    borderRadius: 10,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#BBDEFB",
  },
  createButton: {
    backgroundColor: "#0D47A1",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default StoreStyles;
