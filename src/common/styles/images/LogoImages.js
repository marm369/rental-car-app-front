import { StyleSheet } from "react-native";

const LogoImagesStyles = (width = 120, height = 120, paddingTop = 50, marginTop = 50, marginLeft = 20) => {
  return StyleSheet.create({
    logoImage: {
    width: width,
    height: height,
    paddingTop: paddingTop,
    marginTop: marginTop,
    marginLeft: marginLeft,
    },
  });
};

export default LogoImagesStyles;
