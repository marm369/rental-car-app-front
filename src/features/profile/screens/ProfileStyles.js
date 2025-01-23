import { StyleSheet } from "react-native";

const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F0FF", // Subtle blue background
  },
  header: {
    backgroundColor: "#3B82F6", // Vibrant blue for the header
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    paddingVertical: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFF",
    marginBottom: 10,
    top: 35,
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6", // Blue for titles
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E40AF", // Blue for logout button
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 30,
    marginBottom: 30,
    marginTop: 40,
  },

  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F0FF", // Subtle blue background
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#3B82F6", // Blue for loading text
  },
});

export default ProfileStyles;
