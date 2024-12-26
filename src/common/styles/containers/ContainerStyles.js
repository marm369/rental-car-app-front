import { StyleSheet, useColorScheme } from "react-native";

const ContainerStyles = () => {
  const colorScheme = useColorScheme(); 

  const containerColor = colorScheme === "dark" ? "#000000" :  "#FFFFFF";

  return StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: containerColor,
      },
  });
};

export default ContainerStyles;
