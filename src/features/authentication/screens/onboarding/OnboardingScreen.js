import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import Images from "../../../../utils/constants/Images";
import Texts from "../../../../utils/constants/Texts";
import OnboardingButtonStyles from "../../../../common/styles/buttons/OnboardingButtonsStyles";
import ContainerStyles from "../../../../common/styles/containers/ContainerStyles";
import OnboardingImagesStyles from "../../../../common/styles/images/OnboardingImagesStyles";
import TextsStyles from "../../../../common/styles/texts/TextsStlyes";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const containerStyles = ContainerStyles();
  const buttonStyles = OnboardingButtonStyles();
  const imageStyles = OnboardingImagesStyles();
  const titleTextStyles = TextsStyles({ fontSize: 24, fontWeight: "bold" });
  const subTitleTextStyles = TextsStyles({
    fontSize: 14,
    fontWeight: "normal",
    color: "#4B4B4B",
  });

  const handleDone = () => {
    navigation.navigate("Login");
  };

  // Bouton Skip
  const SkipButton = ({ ...props }) => (
    <TouchableOpacity style={buttonStyles.skipButton} {...props}>
      <Text style={buttonStyles.buttonText}>Skip</Text>
    </TouchableOpacity>
  );

  // Bouton Next
  const NextButton = ({ ...props }) => (
    <TouchableOpacity style={buttonStyles.nextButton} {...props}>
      <Text style={buttonStyles.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  // Bouton Done
  const DoneButton = ({ ...props }) => (
    <TouchableOpacity style={buttonStyles.doneButton} {...props}>
      <Text style={buttonStyles.buttonText}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <View style={containerStyles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        SkipButtonComponent={SkipButton}
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: "transparent",
            image: (
              <Image
                source={Images.onBoardingImage1}
                style={imageStyles.onboardingImage}
              />
            ),
            title: (
              <Text style={titleTextStyles.title}>
                {Texts.onBoardingTitle1}
              </Text>
            ),
            subtitle: (
              <Text style={subTitleTextStyles.title}>
                {Texts.onBoardingSubTitle1}
              </Text>
            ),
          },
          {
            backgroundColor: "transparent",
            image: (
              <Image
                source={Images.onBoardingImage2}
                style={imageStyles.onboardingImage}
              />
            ),
            title: (
              <Text style={titleTextStyles.title}>
                {Texts.onBoardingTitle2}
              </Text>
            ),
            subtitle: (
              <Text style={subTitleTextStyles.title}>
                {Texts.onBoardingSubTitle2}
              </Text>
            ),
          },
          {
            backgroundColor: "transparent",
            image: (
              <Image
                source={Images.onBoardingImage3}
                style={imageStyles.onboardingImage}
              />
            ),
            title: (
              <Text style={titleTextStyles.title}>
                {Texts.onBoardingTitle3}
              </Text>
            ),
            subtitle: (
              <Text style={subTitleTextStyles.title}>
                {Texts.onBoardingSubTitle3}
              </Text>
            ),
          },
          {
            backgroundColor: "transparent",
            image: (
              <Image
                source={Images.onBoardingImage4}
                style={imageStyles.onboardingImage}
              />
            ),
            title: (
              <Text style={titleTextStyles.title}>
                {Texts.onBoardingTitle4}
              </Text>
            ),
            subtitle: (
              <Text style={subTitleTextStyles.title}>
                {Texts.onBoardingSubTitle4}
              </Text>
            ),
          },
        ]}
      />
    </View>
  );
}
