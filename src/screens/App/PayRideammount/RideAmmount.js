/** @format */

import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Linking,
  Alert,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
//logo
import {
  location,
  currentlocation,
  carmove,
  Persons,
  message,
  caricon,
} from "../../../assets";
import { GradientButton } from "../../../components/GradientButton";
//redux
import {
  getpaymentdetail,
  paymentfromuserbalance,
  ongoingtrip,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";
import Headers1 from "../../../components/Headers1";

import fonts from "../../../theme/fonts";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import PolylineDirection from "react-native-maps/polyline-direction";
import PolylineDirection from "@react-native-maps/polyline-direction";
import MapViewDirections from "@react-native-maps/polyline-direction";
import { getDistance } from "geolib";
import Geolocation from "@react-native-community/geolocation";
import database from "@react-native-firebase/database";
import SelectDropdown from "react-native-select-dropdown";
import { cross } from "../../../assets";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { showLocation } from "react-native-map-link";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import openMap from "react-native-open-maps";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
const roomRef = database().ref("rooms");

const RideAmmount = ({
  signin,
  route,
  signupwithfb,
  selectedLanguages,
  translation,
  ongoingtrip,
  user,
  paymentfromuserbalance,
  getpaymentdetail,
}) => {
  const navigation = useNavigation();

  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const [distance, setdistance] = useState();
  const [timee, settime] = useState();
  const [msg, setMsg] = useState("");
  const [showAlertuser, setshowAlertuser] = useState(false);
  const [showAlertcash, setshowAlertcash] = useState(false);
  const [ShowAlert1, setShowAlert1] = useState(false);
  const [showtipalert, setshowtipalert] = useState(true);
  const [ifgivetip, setifgivetip] = useState(false);
  const [ifgivenotip, setifgivenotip] = useState(false);
  const [tipamount, settipamount] = useState("");
  let [rideamount, setrideamount] = useState("");
  let [tamount, settamount] = useState("");
  const [myNumber, setMyNumber] = React.useState("");
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const fomData = new FormData();
        fomData.append("u_id", user.u_id);

        const res = await getpaymentdetail(fomData);

        if (res.data.status == true) {
          setrideamount(res.data.data.ride_actual_payment);
          settamount(res.data.data.ride_actual_payment);

          setData(res.data.data);
        } else {
          // navigation.navigate("Map")
        }
      })();
    }, [])
  );

  const cashHandle = async (item) => {
    setshowAlertcash(true);
    setMsg("Are you sure you want to proceed with cash?");
  };
  const userbalance = async (item) => {
    setshowAlertuser(true);
    setMsg("Are you sure you want to proceed with user balance?");
  };
  const cardhHandle = async (item) => {
    settipamount("");
    navigation.navigate("BillingPayment", {
      payment: tamount,
      screen: "Map",
      receiverid: Data.u_id,
      tripid: Data.trip_id,
    });
  };

  const giveTip = async (id) => {
    setifgivetip(true);
    setifgivenotip(true);
  };
  const nopress = async (item) => {
    settipamount(0);
    settamount(rideamount);
    setifgivenotip(true);
    setifgivetip(false);
  };

  const entertip = async (item) => {
    settipamount(item);

    if (item != "") {
      let a = parseFloat(item);
      let b = parseFloat(rideamount);
      let sum = a + b;
      console.log("mya", a);
      console.log("myb", b);
      console.log("myc", rideamount);
      settamount(sum);
    } else {
      settamount(rideamount);
    }
  };
  const yespress = async (id) => {
    const formData = new FormData();
    formData.append("u_id", user.u_id);
    formData.append("amount", tamount);
    formData.append("trip_id", Data.trip_id);
    formData.append("status", id);

    const res = await paymentfromuserbalance(formData);
    console.log("myformdata", res);
    if (res.data.status == true) {
      navigation.navigate("Ratings", {
        Dataa: res.data,
        tripid: Data.trip_id,
      });
      settipamount("");
      setshowAlertuser(false);
      setshowAlertcash(false);

      setModalVisible(false);
    } else {
      navigation.navigate("Map");
      setshowAlertuser(false);
      setshowAlertcash(false);
      setMsg(res.data.message);
      setShowAlert1(true);
    }
  };

  const cancelpress = async (id) => {
    setshowAlertuser(false);
    setshowAlertcash(false);
  };

  const mapRef = useRef();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title={translation[312][selectedLanguages].trim()}
        // title= "Pay Ride Ammount"
        screen={"false"}
        show={"No"}
      />
      {ShowAlert1 && (
        <AlertModal
          heading={msg}
          // "Rated Successfully"
          button1={translation[185][selectedLanguages]}
          // button1="OK"

          onOkPress={() => setShowAlert1(false)}
          form="addd"
        />
      )}
      {showAlertuser && (
        <AlertModal
          heading={msg}
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          button2={translation[99][selectedLanguages]}
          // button2="Cancel"

          onYesPress={() => yespress("User_Balance")}
          onNoPress={cancelpress}
        />
      )}
      {showAlertcash && (
        <AlertModal
          heading={msg}
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          button2={translation[99][selectedLanguages]}
          // button2="Cancel"

          onYesPress={() => yespress("Cash")}
          onNoPress={cancelpress}
        />
      )}

      <Loading visible={loading} />

      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {translation[305][selectedLanguages]}
          </Text>
          {/* <Text style={{fontSize:18}}>Payable Ammount</Text> */}

          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {Data.ride_actual_payment}lv
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {translation[306][selectedLanguages]}
          </Text>
          {/* <Text style={{fontSize:18}}>Would you like to give tip</Text> */}
        </View>

        <View
          style={{
            borderWidth: 0,
            flexDirection: "row",
            marginTop: "10%",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              paddingTop: 10,
              paddingRight: 5,
              borderWidth: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => giveTip()}
              style={{
                backgroundColor: colors.yellow,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colors.black,
                  textAlign: "center",
                  justifyContent: "center",
                  textAlignVertical: "center",
                  paddingVertical: 12,
                }}
              >
                {/* {translation[96][selectedLanguages]} */}
                {translation[176][selectedLanguages]}
                {/* Yes */}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => nopress()}
              style={{
                backgroundColor: colors.yellow,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colors.black,
                  textAlign: "center",
                  justifyContent: "center",
                  textAlignVertical: "center",
                  paddingVertical: 12,
                }}
              >
                {translation[175][selectedLanguages]}
                {/* NO */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {ifgivetip == true && (
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              marginTop: "10%",
              paddingHorizontal: 30,
            }}
          >
            <TextInput
              style={{ height: 50, backgroundColor: "white" }}
              placeholder={translation[311][selectedLanguages]}
              selectionColor={colors.primary}
              onChangeText={(text) => entertip(text?.replace(/[^0-9\.]/g, ""))}
              value={tipamount}
              keyboardType={"phone-pad"}
              theme={{
                colors: { primary: colors.primary },
              }}
            />
          </View>
        )}
        {ifgivenotip == true && (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                paddingVertical: 5,
                paddingHorizontal: 80,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                {translation[307][selectedLanguages]}
              </Text>
              {/* <Text style={{fontSize:18}}>Trip Coast</Text> */}
              <Text style={{ fontSize: 18 }}>
                {" "}
                {Data.ride_actual_payment}lv
              </Text>
            </View>
            {tipamount.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 80,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {translation[308][selectedLanguages]}
                </Text>
                {/* <Text style={{fontSize:18}}>Tip Amount</Text> */}
                <Text style={{ fontSize: 18 }}> {tipamount}lv</Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                paddingHorizontal: 80,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                {translation[309][selectedLanguages]}
              </Text>
              {/* <Text style={{fontSize:18}}>Total Amount</Text> */}
              <Text style={{ fontSize: 18 }}> {tamount}lv</Text>
            </View>
          </View>
        )}

        {(ifgivetip == true || ifgivenotip == true) && (
          <View>
            <View
              style={{
                marginTop: 30,
                paddingHorizontal: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                {translation[310][selectedLanguages]}
              </Text>
              {/* <Text style={{fontSize:18}}>Chose method to pay</Text> */}
            </View>
            <View
              style={{
                borderWidth: 0,
                flexDirection: "row",
                marginTop: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {(Data.payment_method_accept == "Cash" ||
                Data.payment_method_accept == "Both") && (
                <View
                  style={{
                    flex: 1,
                    paddingTop: 10,
                    paddingRight: 5,
                    borderWidth: 0,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => cashHandle()}
                    style={{
                      backgroundColor: colors.yellow,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.black,
                        textAlign: "center",
                        justifyContent: "center",
                        textAlignVertical: "center",
                        paddingVertical: 12,
                      }}
                    >
                      {translation[96][selectedLanguages]}
                      {/* Cash */}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {(Data.payment_method_accept == "Card" ||
                Data.payment_method_accept == "Both") && (
                <View
                  style={{
                    flex: 1,
                    paddingTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => cardhHandle()}
                    style={{
                      backgroundColor: colors.yellow,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.black,
                        textAlign: "center",
                        justifyContent: "center",
                        textAlignVertical: "center",
                        paddingVertical: 12,
                      }}
                    >
                      {translation[233][selectedLanguages]}
                      {/* Card */}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View
                style={{
                  flex: 1,
                  paddingTop: 10,
                  paddingLeft: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => userbalance()}
                  style={{
                    backgroundColor: colors.yellow,
                    borderRadius: 7,
                  }}
                >
                  {/* {Data[0].payment_method_accept == "Both" ? ( */}
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.black,
                      textAlign: "center",
                      justifyContent: "center",
                      textAlignVertical: "center",

                      paddingVertical: 12,
                    }}
                  >
                    {translation[234][selectedLanguages]}
                    {/*Balance */}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return {
    user,
    selectedLanguages,
    translation,
  };
};
export default connect(mapStateToProps, {
  ongoingtrip,
  paymentfromuserbalance,
  getpaymentdetail,
})(RideAmmount);
