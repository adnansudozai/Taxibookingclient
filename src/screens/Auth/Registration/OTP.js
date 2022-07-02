import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import colors from "../../../theme/colors";
import {
  logo_blue,
  envalop,
  logocolored,
  Logo1,
  applogo,
} from "../../../assets";
import AlertModal from "../../../components/AlertModal";
import CountDown from "react-native-countdown-component";

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");
import OTPInputView from "@twotalltotems/react-native-otp-input";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  confirmOTP,
  authState,
  signInWithPhone,
  signup,
  deleteacct,
  checkPhoneNo,
  updateProfileIno1,
} from "../../../redux/actions/auth";
import { Loading } from "../../../components/Loading";
import fonts from "../../../theme/fonts";
import { color } from "react-native-reanimated";
import { CommonActions } from "@react-navigation/routers";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
class OTP extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
      timer: 59,
      disabled: true,
      confirmation: null,
      loading: false,
      update: undefined,
      msg: "",
      show: false,
    };
  }

  handler = async (code) => {
    try {
      const confirmation = this.props.route?.params?.confirmation;
      const phoneNumber = this.props.route?.params?.phoneNumber;
      Keyboard.dismiss();
      this.setState({ loading: true });
      const res = await this.props.confirmOTP(code, confirmation);
      this.setState({ loading: false });
      if (res) {
        this.saveUserDetails();
        // this.props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: 'Root'}],
        //   }),
        // );
      }
    } catch (err) {
      this.setState({ loading: false, msg: err.message, show: true });
    }
  };
  sendAgain = async () => {
    if (!this.state.disabled) {
      this.setState({
        disabled: true,
      });

      const phone = this.props.route?.params?.phoneNumber;
      try {
        Keyboard.dismiss();
        this.setState({
          loading: true,
        });
        let phoneNumber = phone;
        const confirmation = await this.props.signInWithPhone(
          phoneNumber,
          60,
          true
        );
        if (confirmation) {
          navigation.navigate("OTP", {
            phoneNumber,
            confirmation,
          });
        }
        this.setState({
          loading: false,
        });
      } catch (err) {
        this.setState({
          loading: false,
        });
      }
    }
  };
  saveUserDetails = async () => {
    try {
      const phoneNumber = this.props.route?.params?.phoneNumber;
      const fname = this.props.route?.params?.fname;
      const lname = this.props.route?.params?.lname;
      const pass = this.props.route?.params?.pass;
      const authFrom = this.props.route?.params?.authFrom;

      if (authFrom === "reset") {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Reset", params: { phoneNumber, from: "otp" } }],
          })
        );
      } else if (authFrom === "account") {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Setting" }],
          })
        );
      } else if (authFrom === "deleteacct") {
        const formData = new FormData();
        formData.append("phone_no", phoneNumber);
        new Promise((rsl, rej) => {
          this.props.deleteacct(formData, rsl, rej);
        })
          .then((res) => {
            // this.setState({msg: res.data.message, show: true, loading: false});
            setTimeout(() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: "Success", params: { from: "acctdeleted" } },
                  ],
                })
              );
            }, 2000);
          })
          .catch((err) => {
            // this.setState({loading: false, msg: err, show: true}, () => {});
            setTimeout(() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              );
            }, 2000);
          });
      } else if (authFrom === "accountinformation") {
        const email = this.props.route?.params?.email;
        const auth = this.props.route?.params?.auth;

        const formData = new FormData();
        formData.append("first_name", fname);
        formData.append("last_name", lname);
        formData.append("email", email);
        formData.append("phone_no", phoneNumber);
        formData.append("modal", 11);

        new Promise((rsl, rej) => {
          this.props.updateProfileIno1(formData, auth, rsl, rej);
        })
          .then((res) => {
            // this.setState({msg: res.data.message, show: true, loading: false});
            setTimeout(() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: "AccountInformation", params: { from: "1" } },
                  ],
                })
              );
            }, 2000);
          })
          .catch((err) => {
            alert(err);
            // this.setState({loading: false, msg: err, show: true}, () => {});
            setTimeout(() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: "AccountInformation", params: { from: "0" } },
                  ],
                })
              );
            }, 2000);
          });
      } else {
        const formData = new FormData();
        formData.append("first_name", fname);
        formData.append("last_name", lname);
        formData.append("password", pass);
        formData.append("phone_no", phoneNumber);

        formData.append("firebase_uid", auth().currentUser?._user?.uid);
        new Promise((rsl, rej) => {
          this.props.signup(formData, rsl, rej);
        })
          .then((res) => {
            // this.setState({msg: res.data.message, show: true, loading: false});
            setTimeout(() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: "Success", params: { from: "signupsuccess" } },
                  ],
                })
              );

              // 39
            }, 2000);
          })
          .catch((err) => {
            alert(err);
            this.setState({ loading: false, msg: err, show: true }, () => {});
            setTimeout(() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              );
            }, 2000);
          });
      }
    } catch (err) {}
  };

  render() {
    const { timer, disabled, code, loading } = this.state;
    const phoneNumber = this.props.route?.params?.phoneNumber;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={applogo} style={styles.logo_blue} />

          <View style={styles.wrapper}>
            <Text style={styles.text}>An Sms has been sent to you at</Text>
            <Text
              style={[
                styles.text,
                {
                  paddingTop: 10,
                  color: colors.black,
                },
              ]}
            >
              {phoneNumber}
            </Text>

            {disabled == true && (
              <View style={{ flexDirection: "row", marginVertical: 20 }}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color="gray"
                  style={{ alignSelf: "center" }}
                />

                <View style={{ flexDirection: "row" }}>
                  <CountDown
                    until={60}
                    size={15}
                    onFinish={() => this.setState({ disabled: false })}
                    digitStyle={{
                      backgroundColor: "transparent",
                      marginLeft: -3,
                    }}
                    digitTxtStyle={{ color: "gray" }}
                    timeToShow={["S"]}
                    timeLabels={{ m: "", s: "" }}
                  />
                  <Text style={{ alignSelf: "center", marginLeft: -8 }}>s</Text>
                </View>
              </View>
            )}

            {/* {disabled == false && ( */}
            <TouchableOpacity
              disabled={this.state.disabled}
              onPress={() => {
                this.sendAgain();
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    paddingTop: 30,
                    color: colors.yellow,
                    // this.state.disabled ? "gray" :
                    // fontFamily: fonts.PoppinsBold,
                    // textDecorationLine: "underline",
                    // fontWeight: "bold",
                    fontSize: 16,
                  },
                ]}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
            {/* )} */}

            <View style={styles.phoneNumberContainer}>
              <OTPInputView
                style={{
                  width: "60%",
                  height: 30,
                }}
                pinCount={6}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                  this.handler(code);
                }}
                onCodeChanged={(code) => {
                  this.setState({ code });
                }}
              />
            </View>
            <Text style={[styles.text, { paddingTop: 20 }]}>
              Please enter the verification code above
            </Text>
          </View>

          {<Loading visible={loading} />}
        </View>
        {this.state.show && (
          <AlertModal
            heading={this.state.msg}
            button1="OK"
            form={true}
            onOkPress={() => {
              this.setState({ show: false });
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      confirmOTP,
      authState,
      signInWithPhone,
      signup,
      deleteacct,
      updateProfileIno1,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  wrapper: {
    alignItems: "center",
    width: "90%",
  },
  logo_blue: {
    height: 150,
    width: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "20%",
  },
  text: {
    fontSize: 16,
    // color: colors.camera,
    paddingTop: 30,
    fontFamily: fonts.PoppinsMedium,
    textAlign: "center",
    // fontWeight: "bold",
  },
  phoneNumberContainer: {
    // marginTop: 50,
    marginBottom: 20,
  },
  timerContainer: {
    width: "80%",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: colors.white,
    width: 100,
    height: 50,
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily: fonts.PoppinsRegular,

    textAlign: "center",
  },
  btnContainer: {
    width: DEVICE_WIDTH > 700 ? "80%" : "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  primaryBtn: {
    width: DEVICE_WIDTH > 700 ? "80%" : "90%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: fonts.PoppinsRegular,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    // borderColor: color.primary,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,

    color: colors.black,
    fontFamily: fonts.PoppinsRegular,
  },

  underlineStyleHighLighted: {
    borderColor: colors.gray,
  },
});
