import { StyleSheet} from "react-native";

const OnboardingImagesStyles = () => {

  return StyleSheet.create({
    onboardingImage: {
        width: 320,
        height: 320,
        resizeMode: "cover",
        borderRadius: 150,
        overflow: "hidden",
        marginBottom: 20,
      },
  });
};

export default OnboardingImagesStyles;
