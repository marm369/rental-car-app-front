import { StyleSheet, useColorScheme } from "react-native";

const TextsStyles = ({
  fontSize = 16,
  fontWeight = "normal",
  textAlign = "center",
  paddingLeft = 0,
  color,
}) => {
  const colorScheme = useColorScheme();

  const defaultColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  const textColor = color || defaultColor;

  return StyleSheet.create({
    title: {
      fontSize,
      fontWeight,
      color: textColor,
      textAlign,
      marginBottom: 10,
      paddingLeft,
    },
  });
};

export default TextsStyles;
