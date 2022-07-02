import React, { useEffect } from "react";
import { Text, View, Image, ImageBackground, StyleSheet } from "react-native";
import { logo, bg, logo_blue, SplashImage, Logo } from "../../../assets";
import styles from "./styles";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/routers";
import { applogo, flag } from "../../../assets";
import colors from "../../../theme/colors";
import { alltranslation } from "../../../redux/actions/auth";

const Splash = ({
  navigation,
  isLoggedIn,
  from,
  alltranslation,
  selectedLanguages,
  translation,
  user,
}) => {
  (async () => {
    if (
      selectedLanguages == undefined ||
      selectedLanguages == "" ||
      selectedLanguages == null
    ) {
      const res = await alltranslation("English");
    } else {
      const res = await alltranslation(selectedLanguages);
    }
  })();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        if (user.is_first_registered == 0) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "EditProfile" }],
            })
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Map" }],
            })
          );
        }
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Signup" }],
          })
        );
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: colors.yellow,
      }}
    >
      {/* <View
        style={{
          height: 80,
          width: 300,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          paddingBottom: 4,
        }}
      > */}
      <Image
        source={applogo}
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {/* </View> */}
    </View>
  );
  // <ImageBackground style={styles.main} source={SplashImage} />;
};
const mapStateToProps = (state) => {
  const { isLoggedIn, translation, selectedLanguages, user } = state.auth;
  return { isLoggedIn, translation, selectedLanguages, user };
};
export default connect(mapStateToProps, { alltranslation })(Splash);
