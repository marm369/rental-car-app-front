import { StyleSheet, useColorScheme } from "react-native";

const buttonStyle = (backgroundColor, borderColor, textColor) => ({
  backgroundColor: backgroundColor,
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 30,
  marginHorizontal: 20,
  borderWidth: 2,
  borderColor: borderColor,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
  textColor: textColor,
});

const OnboardingButtonStyles = () => {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "#E0E0E0" : "#333333";

  return StyleSheet.create({
    skipButton: buttonStyle("#E3F2FD", "#BBDEFB", textColor), 
    nextButton: buttonStyle("#90CAF9", "#64B5F6", textColor), 
    doneButton: buttonStyle("#1976D2", "#0D47A1", textColor),
    buttonText: {
      fontSize: 16,
      color: textColor,
      fontWeight: "600",
      textTransform: "uppercase",
    },
  });
};

export default OnboardingButtonStyles;
