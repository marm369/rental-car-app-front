import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  Users,
  Fuel,
  DollarSign,
  Calendar,
  ArrowLeft,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

const CarDetailsScreen = ({ route, navigation }) => {
  const { car } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [1, 0.5, 0.2],
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.imageContainer,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Image source={{ uri: car.imageUrl }} style={styles.carImage} />
        </Animated.View>
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)", "transparent"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Animated.Text
            style={[styles.headerTitle, { opacity: titleOpacity }]}
          >
            {car.brandName} {car.modelName}
          </Animated.Text>
        </View>
      </View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.brandName}>{car.brandName}</Text>
          <Text style={styles.modelName}>{car.modelName}</Text>
          <Text style={styles.carCategory}>{car.category}</Text>
          <Text style={styles.carDetails}>
            {car.color} - {car.year}
          </Text>

          <View style={styles.featureContainer}>
            <FeatureItem
              icon={<Users size={24} color="#FFFFFF" />}
              text={`${car.nbrPersonnes} Persons`}
            />
            <FeatureItem
              icon={<Fuel size={24} color="#FFFFFF" />}
              text={car.fuelType}
            />
            <FeatureItem
              icon={<Calendar size={24} color="#FFFFFF" />}
              text={car.year.toString()}
            />
            <FeatureItem
              icon={<DollarSign size={24} color="#FFFFFF" />}
              text={`$${car.pricePerDay}/day`}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <LinearGradient
      colors={["#007BFF", "#0056D2"]}
      style={styles.featureIconContainer}
    >
      {icon}
    </LinearGradient>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    overflow: "hidden",
    zIndex: 10,
  },
  headerContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    overflow: "hidden",
  },
  carImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  detailsContainer: {
    marginTop: height * 0.5,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 5,
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 2,
  },
  modelName: {
    fontSize: 26,
    fontWeight: "600",
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 10,
  },
  carCategory: {
    fontSize: 20,
    fontWeight: "500",
    color: "#6C757D",
    textAlign: "center",
    marginBottom: 10,
  },
  carDetails: {
    fontSize: 18,
    color: "#4A4A4A",
    marginBottom: 20,
    textAlign: "center",
  },
  featureContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
    backgroundColor: "#F0F8FF",
    borderRadius: 15,
    padding: 15,
  },
  featureItem: {
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
  },
});

export default CarDetailsScreen;
