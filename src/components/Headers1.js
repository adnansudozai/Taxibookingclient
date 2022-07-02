import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, BackHandler, Alert } from "react-native";
import { connect } from "react-redux";
import { sendsos, unblockpasanger } from "../redux/actions/auth";
import { Header } from "react-native-elements";
import AlertModal from "../components/AlertModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "./Text";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { updatetoken } from "../redux/actions/auth";
import messaging from "@react-native-firebase/messaging";
const Headers1 = ({
  title,
  selectedLanguages,
  user,
  updatetoken,
  show,
  screen,
  rate,
}) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const myroute = useRoute();

  console.log("mynavigation2====>", myroute);
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const api_interval = setInterval(() => {
        (async () => {
          const fcmToken = await messaging().getToken();

          const fomData = new FormData();

          fomData.append("u_id", user.u_id);
          fomData.append("token", fcmToken);

          fomData.append("selectedLanguages", selectedLanguages);
          const res = await updatetoken(fomData, navigation);
          console.log("data us from intervel header", res);
          if (screen != "false") {
            if (
              res.data.trip_status == "Started" ||
              res.data.trip_status == "Accepted"
            ) {
              navigation.navigate("ArrivalStatus");
            } else if (res.data.trip_status == "payment") {
              navigation.navigate("BillingPayment", {
                tripid: res.data.data.trip_id,
                did: res.data.data.driver_id,
                payment: res.data.data.payableamt,
                screen: "Map",
              });
            }
            // else if (res.data.trip_status == 'rate') {
            //   navigation.navigate('Ratings',{
            //   Dataa:res.data,
            //     })
            //   }
          }
          // console.log("data was", res.data)
        })();
      }, 7000);
      return () => {
        clearInterval(api_interval);
      };
    }, [])
  );

  return (
    <Header
      containerStyle={{
        marginVertical: 20,
      }}
      backgroundColor={"transparent"}
      leftComponent={
        <View
          style={{
            flexDirection: "row",
            width: 500,
            alignItems: "center",
          }}
        >
          {show != "No" && (
            <Ionicons
              name={"chevron-back"}
              size={24}
              color={colors.secondary}
              onPress={() => {
                rate == "false"
                  ? navigation.navigate("Map")
                  : navigation.goBack();
              }}
              style={{ paddingTop: 4 }}
            />
          )}

          <View>
            <CustomText
              title={title}
              type={"large"}
              color={"black"}
              style={{
                fontSize: 20,
                marginLeft: 6,
                fontWeight: "bold",
              }}
            />
          </View>

          {/* <View
            style={{
              marginTop: 10,
              backgroundColor: "#ffc93c",
              borderRadius: 8,
              marginBottom: 10,
              height: 30,
              width: 80,
              marginLeft: 290,
              position: "absolute",
            }}
          >
            <TouchableOpacity
              onPress={() => soshandle()}
              style={{
                fontSize: 10,
                color: "black",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.black,
                  textAlign: "center",
                  justifyContent: "center",
                  textAlignVertical: "center",
                  marginTop: 5,
                }}
              >
                SOS
              </Text>
            </TouchableOpacity>
            {showAlert && (
              <AlertModal
                heading={msg}
                button1="OK"
                button2="Cancel"
                onYesPress={yespress}
                onNoPress={cancelpress}
                onOkPress={() => {
                  setShowAlert(false);
                }}
              />
            )}
          </View> */}
        </View>
      }
    />
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation, trip_id } = state.auth;
  return { user, selectedLanguages, translation, trip_id };
};
export default connect(mapStateToProps, {
  sendsos,
  updatetoken,
})(Headers1);
