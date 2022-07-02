import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from "react-native";
import CustomText from "../../../components/Text";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import fonts from "../../../theme/fonts";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import Fontisto from "react-native-vector-icons/Fontisto";
import auth from "@react-native-firebase/auth";
import { CommonActions } from "@react-navigation/routers";
import { GradientButton } from "../../../components/GradientButton";
import { connect } from "react-redux";
import CountryPicker from "react-native-country-picker-modal";
import { signin } from "../../../redux/actions/auth";
import { Logo2, applogo, flag, english_logo } from "../../../assets";
import Foreground from "../../../components/Foreground";
import Geolocation from "@react-native-community/geolocation";
import { addListener } from "npm";
const Signup = ({ navigation, signin, selectedLanguages, translation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [mnumber, setmnumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [val, setval] = useState([]);
  const [checkmark, setcheckmark] = useState(1);

  const [countryCode, setCountryCode] = useState("PK");
  const [country, setCountry] = useState("");
  const [callingCode, setcallingCode] = useState("92");
  const [craditcard, setcraditcard] = useState("");
  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setcallingCode(country.callingCode);
  };
  const subbmitotp = () => {
    (async () => {
      const formData = new FormData();
      formData.append("phone_no", mnumber);
      formData.append("status", "enduser");
      const res = await signin(formData);
      if (res.data.status == true) {
        if (res.data.data.user_privilidge == 1) {
          setShowAlert(true);
          setMsg(translation[126][selectedLanguages]);
          // setMsg("Your account is blocked,please contact support");
        } else {
          if (res.data.data.is_first_registered == 0) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "EditProfile" }],
              })
            );
          } else if (res.data.data.is_first_registered == 1) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Map" }],
              })
            );
          }
        }
      }
    })();
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((data) => {});
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();

    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      requestLocationPermission();
    } else if (granted === PermissionsAndroid.RESULTS.BLOCKED) {
      requestLocationPermission();
    } else {
    }
  };
  requestLocationPermission();
  async function signInWithPhoneNumber(phoneNumber) {
    // alert(phoneNumber);
    // return false;

    setLoading(true);

    // setConfirm(confirmation);
    if (checkmark == 1) {
      setLoading(false);
      alert(translation[348][selectedLanguages]);
    } else if (checkmark == 2) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      navigation.navigate("OtpSignUp", {
        phoneNumber: phoneNumber,
        confirmation: confirmation,
      });
      setLoading(false);
    }
  }
  async function confirmCode() {
    try {
    } catch (error) {}
  }

  const handlecash = () => {
    if (craditcard == "checkbox-passive") {
      setcraditcard("checkbox-active");
    }

    // craditcard=='checkbox-passive'?setdebit('checkbox-active'):setdebit('checkbox-passive');
  };

  return (
    <SafeAreaView style={{ ...styles.mainContainer }}>
      <KeyboardAwareScrollView
        contentContainerStyle={
          {
            // flexGrow: 1,
          }
        }
      >
        <Foreground />

        <Loading visible={loading} />
        {translation && (
          <View>
            <View
              style={{ borderWidth: 0, alignItems: "center", paddingTop: 25 }}
            >
              <Image
                source={selectedLanguages == "Bulgarian" ? Logo2 : english_logo}
                resizeMode="contain"
                style={{
                  height: 80,
                  width: "50%",
                }}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginTop: 10,
                borderWidth: 0,
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <CustomText
                  title={
                    // "Sign up"
                    translation[0][selectedLanguages]
                  }
                  type={"large"}
                  color={"black"}
                  style={{
                    fontSize: 22,
                    marginLeft: 20,
                    marginTop: 20,
                    fontWeight: "bold",
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    paddingLeft: 20,
                    paddingTop: 20,
                    color: "gray",
                    fontFamily: fonts.PoppinsRegular,
                  }}
                >
                  {translation[1][selectedLanguages]}
                  {/* Please enter your mobile to start using app */}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                marginTop: "5%",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.gray,
                  marginLeft: 20,
                  marginBottom: 10,
                }}
              >
                Country
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  borderWidth: 0,
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 20,
                  borderBottomWidth: 2,
                  color: "gray",
                }}
              >
                <CountryPicker
                  containerButtonStyle={{
                    height: 40,
                    marginTop: 5,
                    justifyContent: "center",
                  }}
                  countryCode={countryCode}
                  withCountryNameButton={true}
                  visible={false}
                  withFlag={true}
                  withCloseButton={true}
                  withAlphaFilter={true}
                  withCallingCode={true}
                  //   withCurrency={true}
                  withEmoji={true}
                  //   withCurrencyButton={true}
                  // withCallingCodeButton={true}
                  withFilter={true}
                  withModal={true}
                  onSelect={onSelect}
                  // country={country}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.gray,
                    marginLeft: 20,
                  }}
                >
                  Your Mobile Number*
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                  width: "90%",
                }}
              >
                <View style={{ borderBottomWidth: 1, flexDirection: "row" }}>
                  {/* <AntDesign
                style={{
                  marginTop: 13,
                }}
                name="plus"
                size={16}
                color="black"
              /> */}
                  <Text
                    style={{
                      backgroundColor: "white",
                      borderBottomWidth: 0,
                      fontSize: 19,
                      marginTop: 8,
                      marginLeft: 1,
                    }}
                  >
                    {callingCode}
                  </Text>
                </View>

                <TextInput
                  style={{
                    width: "84%",
                    backgroundColor: "white",
                    height: 40,
                    fontSize: 20,
                    marginRight: 10,
                    marginLeft: 10,
                    borderBottomWidth: 1,
                  }}
                  selectionColor={colors.red}
                  keyboardType={"number-pad"}
                  onChangeText={(pno) => setmnumber(pno)}
                  theme={{
                    colors: {
                      primary: colors.red,
                      underlineColor: "transparent",
                    },
                  }}
                  maxLength={10}
                  // value={num}
                  // keyboardType="numeric"
                />
              </View>
            </View>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                }}
              >
                {checkmark == 1 && (
                  <Fontisto
                    name={"checkbox-passive"}
                    color={"#ffc93c"}
                    size={20}
                    style={{ fontSize: 15, marginTop: 30 }}
                    onPress={() => setcheckmark(2)}
                  />
                )}
                {checkmark == 2 && (
                  <Fontisto
                    name={"checkbox-active"}
                    color={"#ffc93c"}
                    size={20}
                    style={{ fontSize: 15, marginTop: 30 }}
                    onPress={() => setcheckmark(1)}
                  />
                )}

                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 28,
                    fontFamily: fonts.PoppinsRegular,
                    marginLeft: 8,
                    textAlign: "center",
                  }}
                >
                  {translation[347][selectedLanguages]}
                  {/* you agree to your terms if getting user location. */}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 70, marginHorizontal: 10, elevation: 1 }}>
              <GradientButton
                title={translation[2][selectedLanguages]}
                // "Sign in"
                onButtonPress={() =>
                  signInWithPhoneNumber("+" + callingCode + mnumber)
                }
                // onButtonPress={() =>
                //   subbmitotp()

                // }
              />
            </View>
          </View>
        )}
        {showAlert && (
          <AlertModal
            heading={msg}
            button1={translation[185][selectedLanguages]}
            // button1="OK"
            form={true}
            onOkPress={() => {
              setShowAlert(false);
            }}
          />
        )}
        <Loading visible={loading} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  signin,
})(Signup);
