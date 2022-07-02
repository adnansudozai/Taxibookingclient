import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import styles from "./styles";
import { girl, logo } from "../../../assets";
import { SocialButton } from "../../../components/SocialButton";
import Button from "../../../components/Button";
import CustomText from "../../../components/Text";
import auth from "@react-native-firebase/auth";
import { ButtonGroup } from "react-native-elements";
import { Loading } from "../../../components/Loading";
//google
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
//facebook
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { socialLogin, appleLogin } from "../../../redux/actions/app";
import { connect } from "react-redux";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import AsyncStorage from "@react-native-community/async-storage";
import colors from "../../../theme/colors";
const Registration = ({
  navigation,
  socialLogin,
  appleAlreadyLogin,
  appleLogin,
}) => {
  const buttons = ["Registrarse", "Iniciar sesión"];
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  //google config
  GoogleSignin.configure({
    webClientId:
      "881205049790-kqubvvafla2s1h07ctpd9egti9no9573.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: "", // specifies a hosted domain restriction
    loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: "", // [Android] specifies an account name on the device that should be used
    iosClientId:
      "881205049790-l8ev4od8389e0uo48hk6ctj6is02p8mo.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      userInfo && saveUser(userInfo.user.name, userInfo.user.email, "google");
      // alert(`${userInfo.user.email}\n${userInfo.user.name}`);
      // this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const saveUser = (username, email, from) => {
    setLoading(true);
    const fromData = new FormData();
    fromData.append("action", "sociallogin");
    fromData.append("username", username);
    fromData.append("email", email);
    fromData.append("loginfrom", from);
    let where = "social";

    new Promise((rsl, rej) => {
      socialLogin(fromData, where, rsl, rej);
    })
      .then((res) => {
        setLoading(false);
        navigation.navigate("Root");
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleFacebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
      // 'user_friends',
    ]);
    // setRes(results);

    if (result.isCancelled) {
      throw "User cancelled the login process";
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    // data && setFbLoading(true);
    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };
  const updateIndex = (selectedIndex) => {
    setSelected(selectedIndex);
  };

  const loginWithApple = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        if (!appleAlreadyLogin) {
          if (appleAuthRequestResponse) {
            let { email, fullName } = appleAuthRequestResponse;
            saveUser(fullName.givenName, email, "apple");
            email && (await AsyncStorage.setItem("apple_mail", email));
            fullName &&
              (await AsyncStorage.setItem("apple_name", fullName.givenName));
            await appleLogin(true);
            saveUser(email, fullName.givenName, "apple");
            //TODO CALL YOUR API FOR SAVING APPLE INFO ON SERVER && REGISTERING USER
            // callAppleAuthApi(appleData);
          }
        } else {
          //TODO CALL FETCH API FOR GETTING APPLE INFO FROM SERVER && REGISTERING USER
          let mail = await AsyncStorage.getItem("apple_mail");
          let name = await AsyncStorage.getItem("apple_name");
          saveUser(mail, name, "apple");
        }
      } else {
      }
    } catch (err) {
      // Alert.alert('Living Fashion', err.message);
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        flexGrow: 1,
        // justifyContent: 'center',
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1590845947676-fa2576f401b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        }}
        style={styles.headerImg}
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <View>
          <CustomText
            title={"Gorilla Express"}
            type={"large"}
            color={colors.primary}
            style={{
              fontSize: 25,
              marginTop: 20,
              // alignSelf: 'center',
            }}
            textAlign={"center"}
          />
          <CustomText
            title={"Gadgets tecnológicos en un solo lugar"}
            type={"large"}
            style={{
              fontSize: 16,
              marginTop: 20,
              // alignSelf: 'center',
            }}
            textAlign={"center"}
          />
        </View>
        <Button
          title={"Vamos a comenzar"}
          style={{
            width: "90%",
            borderColor: "#707070",
            alignSelf: "center",
          }}
          textColor="white"
          onPress={() => {
            navigation.navigate("Signup");
          }}
        />
      </View>
      <Loading visible={loading} />
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  const { appleAlreadyLogin } = state.app;
  return { appleAlreadyLogin };
};
export default connect(mapStateToProps, { socialLogin, appleLogin })(
  Registration
);
