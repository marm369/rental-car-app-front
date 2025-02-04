import { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Bell, MessageCircle, Calendar } from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import ProfileController from "../../../profile/controllers/ProfileController.js"

export const AppBar = ({ onNotificationPress }) => {
  const [username, setUsername] = useState("")
  const [userRole, setUserRole] = useState("")
  const navigation = useNavigation()
  const { userInfo } = ProfileController()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username")
        const storedRole = await AsyncStorage.getItem("role")
        if (storedUsername) {
          setUsername(storedUsername)
        }
        if (storedRole) {
          setUserRole(storedRole)
        }
      } catch (error) {
        console.error("Error retrieving user data from storage:", error)
      }
    }
    fetchUserData()
  }, [])

  const handleMessagePress = () => {
    navigation.navigate("ChatScreen")
  }

  const handleReservationPress = () => {
    navigation.navigate("ReservationManagement")
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: userInfo?.picture }} style={styles.profileImage} />
        <Text style={styles.userName}>{username}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={handleMessagePress} style={styles.iconButton}>
          <MessageCircle size={24} color="#000" />
        </TouchableOpacity>
        {userRole === "RENTER" && (
          <TouchableOpacity onPress={handleReservationPress} style={styles.iconButton}>
            <Calendar size={24} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
          <Bell size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
})

