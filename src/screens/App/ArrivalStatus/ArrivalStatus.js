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
  Button,
  Alert,
  ImageBackground,
  PermissionsAndroid,
  Linking,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
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
  cancelride,
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

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { showLocation } from "react-native-map-link";
import TrackPlayer from "react-native-track-player";
import openMap from "react-native-open-maps";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
const roomRef = database().ref("rooms");

const ArrivalStatus = ({
  signin,
  route,
  cancelride,
  selectedLanguages,
  translation,
  ongoingtrip,
  user,
  paymentfromuserbalance,
}) => {
  const navigation = useNavigation();

  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [senderid, setsenderid] = useState(user != null ? user.u_id : "");
  const [receiverid, setreceiverid] = useState("");
  const [indexid, setindexid] = useState();
  const [driverlati, setdriverlati] = useState();
  const [driverlongi, setdriverlongi] = useState();
  const [date, setdate] = useState("");
  const [fromlatitude, setfromlatitude] = useState("");
  const [fromlongitude, setfromlongitude] = useState("");

  const [tolatitude, settolatitude] = useState("");
  const [tolongitude, settolongitude] = useState("");
  const [origin, setorigin] = useState("");
  const [destination, setdestination] = useState("");
  const [destination1, setdestination1] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  console.log("myroute", route);
  useFocusEffect(
    React.useCallback(() => {
      hello();
    }, [])
  );

  const hello = () => {
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);

      const res = await ongoingtrip(fomData);
      console.log("formdata was th", res);

      if (res.data.status == true) {
        if (res.data.data[0].trip_stage_status == "payment") {
          navigation.navigate("RideAmmount");

          setloading(false);
        } else if (res.data.data[0].trip_stage_status == "complete") {
          navigation.navigate("Map");
        } else if (res.data.data[0].trip_stage_status == "cancel") {
          start();
          alert(translation[338][selectedLanguages]);
          navigation.navigate("Map");
        }

        setreceiverid(res.data.data[0].u_id);
        console.log("driver lati ", res.data.data);
        setfromlatitude(res.data.data[0].trip_from_lat);
        setfromlongitude(res.data.data[0].trip_from_long);

        settolatitude(res.data.data[0].trip_to_lat);
        settolongitude(res.data.data[0].trip_to_long);

        let driverorigin = {
          latitude: res.data.data[0].driver_lat,
          longitude: res.data.data[0].driver_long,
        }; //driver location

        setorigin(driverorigin);

        let fromadres = {
          latitude: parseFloat(res.data.data[0].trip_from_lat),
          longitude: parseFloat(res.data.data[0].trip_from_long),
        };

        setdestination(fromadres);

        let toadres = {
          latitude: parseFloat(res.data.data[0].trip_to_lat),
          longitude: parseFloat(res.data.data[0].trip_to_long),
        };

        setdestination1(toadres);

        setData(res.data.data);

        console.log("complte status", res.data.data[0].driver_lat);
        setdriverlati(res.data.data[0].driver_lat);
        setdriverlongi(res.data.data[0].driver_long);

        setloading(false);
      } else {
        setloading(false);
        navigation.navigate("Map");
      }
    })();
  };

  const start = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();
    //   // Add a track to the queue
    await TrackPlayer.add({
      id: "trackId",
      url: require("../../../assets/images/beep.mp3"),
      title: "Track Title",
      artist: "Track Artist",
      artwork: "https://picsum.photos/300",
    });
    // Start playing it
    await TrackPlayer.play();
  };

  useFocusEffect(
    React.useCallback(() => {
      const api_interval = setInterval(() => {
        hello();
      }, 10000);
      return () => {
        clearInterval(api_interval);
      };
    }, [])
  );

  const [distance, setdistance] = useState();
  const [timee, settime] = useState();
  const [msg, setMsg] = useState("");
  const [showAlertuser, setshowAlertuser] = useState(false);
  const [showAlertcash, setshowAlertcash] = useState(false);
  const [ShowAlert1, setShowAlert1] = useState(false);

  const cashHandle = async (item) => {
    setshowAlertcash(true);
    setMsg("Are you sure you want to proceed with cash?");
  };
  const userbalance = async (item) => {
    setshowAlertuser(true);
    setMsg("Are you sure you want to proceed with user balance?");
  };
  const cardhHandle = async (item) => {
    setModalVisible(false);

    navigation.navigate("BillingPayment", {
      payment: Data[0].ride_actual_payment,
      screen: "Map",
      receiverid: Data[0].u_id,
      tripid: Data[0].trip_id,
    });
  };

  const yespress = async (id) => {
    const formData = new FormData();
    formData.append("u_id", user.u_id);
    formData.append("amount", Data[0].ride_actual_payment);
    formData.append("trip_id", Data[0].trip_id);
    formData.append("status", id);

    const res = await paymentfromuserbalance(formData);
    console.log("pay_by_userblnc", res, formData);
    if (res.data.status == true) {
      navigation.navigate("Ratings", {
        Dataa: res.data,
        tripid: Data[0].trip_id,
      });
      setshowAlertuser(false);
      setshowAlertcash(false);

      setModalVisible(false);
    } else {
      setshowAlertuser(false);
      setshowAlertcash(false);
      setMsg(res.data.message);
      setShowAlert1(true);
    }
  };
  // .state.routeName

  const cancelride1 = async (id) => {
    setloading(true);
    const formData = new FormData();
    formData.append("u_id", user.u_id);
    formData.append("trip_id", id);
    formData.append("status", "cancel");

    const res = await cancelride(formData);
    console.log("myres", res);
    if (res.data.status == 0) {
      setloading(false);
      alert(res.data.message);
      navigation.navigate("Map");
    } else {
      setloading(false);
      alert(res.data.message);
    }
  };

  const cancelridenow = async (id) => {
    Alert.alert("Alert", translation[328][selectedLanguages], [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          cancelride1(id);
        },
      },
    ]);
  };

  const cancelpress = async (id) => {
    setshowAlertuser(false);
    setshowAlertcash(false);
  };
  const checkkey = async (item) => {
    try {
      roomRef.on("value", (snapshot) => {
        let roomsFB = [];
        snapshot.forEach((element) => {
          roomsFB.push({
            key: element.key,
            send_uid: element.val().send_uid,
            recv_uid: element.val().recv_uid,
            created_at: element.val().created_at,
            trip_id: element.val().trip_id,
          });
        });
        const res = roomsFB?.some((element) => {
          return (
            (element.recv_uid == senderid &&
              element.send_uid == receiverid &&
              element.trip_id == Data[0].trip_id) ||
            (element.recv_uid == receiverid &&
              element.send_uid == senderid &&
              element.trip_id == Data[0].trip_id)
          );
        });
        console.log(res);
        if (res) {
          const index = roomsFB.find((element) => {
            return (
              (element.recv_uid == senderid &&
                element.send_uid == receiverid &&
                element.trip_id == Data[0].trip_id) ||
              (element.recv_uid == receiverid &&
                element.send_uid == senderid &&
                element.trip_id == Data[0].trip_id)
            );
          });
          setindexid(`messages/${index.key}`);
          navigation.navigate("chatting", {
            messagekey: `messages/${index.key}`,
            receiverid: receiverid,
            dname: Data[0].name,
            screen: "driver",
            devicetoken: Data[0].device_token,
          });
        } else {
          addRoom(item);
          roomRef.off();
        }
      });
    } catch (err) {
      console.log(err);
    }
    const addRoom = async (item) => {
      try {
        await roomRef.push({
          send_uid: senderid,
          recv_uid: receiverid,
          created_at: new Date().getTime(),
          trip_id: Data[0].trip_id,
        });
      } catch (err) {
        alert(err);
      }
    };
  };
  console.log("data 123+>>", Data[0]);
  const mapRef = useRef();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title={translation[84][selectedLanguages].trim()}
        // "Pick up call received"
        screen={"false"}
      />
      <Loading visible={loading} />
      {Data != "" && (
        <SafeAreaView>
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
          {ShowAlert1 && (
            <AlertModal
              heading={msg}
              // "Rated Successfully"
              button1={translation[185][selectedLanguages]}
              // button1="OK"

              onYesPress={() => setShowAlert1(false)}
              form="addd"
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

          <Modal isVisible={isModalVisible}>
            <View
              style={{
                backgroundColor: "#FBFBFB",
                borderRadius: 7,
                borderWidth: 1,
                height: "50%",
                width: "90%",
                margin: 20,
                flex: Platform.OS == "android" ? 0.5 : 0.5,
              }}
            >
              {/* <Entypo
            name='cross'
            color={colors.yellow}
            size={22}
            onPress={cancelmodel}
            style={{
              alignItems: "flex-end",
              alignSelf: "flex-end",
              padding: 10,
            }}
          /> */}
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: fonts.PoppinsBold,
                    color: colors.black,
                    textAlign: "center",
                    justifyContent: "center",
                    textAlignVertical: "center",
                    marginTop: "40%",
                  }}
                >
                  {translation[255][selectedLanguages]}
                  {/* How would you like to take the payment? */}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.PoppinsBold,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  {Data[0].ride_actual_payment} lv
                </Text>
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
                {(Data[0].payment_method_accept == "Cash" ||
                  Data[0].payment_method_accept == "Both") && (
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

                {(Data[0].payment_method_accept == "Card" ||
                  Data[0].payment_method_accept == "Both") && (
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
                      {/* User Balance */}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View>
            {Data[0].driver_lat != "" && (
              <MapView
                style={{
                  width: "100%",
                  height: 330,
                  marginTop: -20,
                }}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                pitchEnabled={true}
                showsUserLocation={true}
                followsUserLocation={true}
                showsCompass={true}
                showsBuildings={true}
                showsTraffic={true}
                showsIndoors={true}
                initialRegion={{
                  latitude: parseFloat(Data[0].driver_lat),
                  longitude: parseFloat(Data[0].driver_long),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                {Data[0].trip_stage_status == "Accepted" && (
                  <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apiKey={API_KEY} // insert your API Key here
                    strokeWidth={10}
                    strokeColor={colors.yellow}
                    optimizeWaypoints={true}
                    onReady={(result) => {
                      setdistance(result.distance);
                      settime(result.duration);
                      // mapRef.current.fitToCoordinates(result.coordinates, {
                      //   edgePadding: {
                      //     right: 20,
                      //     left: 20,
                      //     top: 20,
                      //     bottom: 20,
                      //   },
                      // });
                    }}
                  />
                )}
                {Data[0].trip_stage_status == "Accepted" && (
                  <Marker
                    coordinate={{
                      latitude: parseFloat(Data[0].trip_from_lat),
                      longitude: parseFloat(Data[0].trip_from_long),
                    }}
                  />
                )}
                {Data[0].trip_stage_status == "Accepted" && (
                  <Marker
                    coordinate={{
                      latitude: parseFloat(Data[0].driver_lat),
                      longitude: parseFloat(Data[0].driver_long),
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/caricon.png")}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                      resizeMode="contain"
                    />
                  </Marker>
                )}

                {Data[0].trip_stage_status == "Started" && (
                  <MapViewDirections
                    origin={origin}
                    destination={destination1}
                    apiKey={API_KEY} // insert your API Key here
                    strokeWidth={4}
                    strokeColor={colors.yellow}
                    optimizeWaypoints={true}
                    onReady={(result) => {
                      setdistance(result.distance);
                      settime(resulzt.duration);
                    }}
                  />
                )}
                {Data[0].trip_stage_status == "Started" && (
                  <Marker
                    coordinate={{
                      latitude: parseFloat(Data[0].trip_to_lat),
                      longitude: parseFloat(Data[0].trip_to_long),
                    }}
                  />
                )}
                {Data[0].trip_stage_status == "Started" && (
                  <Marker
                    coordinate={{
                      latitude: parseFloat(Data[0].driver_lat),
                      longitude: parseFloat(Data[0].driver_long),
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/caricon.png")}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                      resizeMode="contain"
                    />
                  </Marker>
                )}
              </MapView>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingBottom: 20,
              flex: 1,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Image
                source={currentlocation}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  marginTop: 20,
                  marginLeft: 15,
                  borderRadius: 100 / 2,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: fonts.PoppinsBold,
                  color: "black",
                  marginLeft: 5,
                  marginTop: 20,
                  flex: 1,
                }}
              >
                {/* Pick up */}
                {translation[80][selectedLanguages]}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "gray",
                  marginTop: 45,
                  marginLeft: -95,
                  marginRight: -6,
                  flex: 1,
                }}
              >
                {Data[0].trip_from_address}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Image
                source={carmove}
                resizeMode="contain"
                style={{
                  height: 50,
                  width: 120,
                  marginTop: 13,
                  marginLeft: 7,
                  borderRadius: 100 / 2,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Image
                source={location}
                resizeMode="contain"
                style={{
                  height: 26,
                  width: 28,
                  marginTop: 21,
                  borderRadius: 100 / 2,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: fonts.PoppinsBold,
                  color: "black",
                  marginLeft: 2,
                  marginTop: 20,
                }}
              >
                {/* Drop off */}
                {translation[81][selectedLanguages]}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "gray",
                  marginTop: 45,
                  marginLeft: -82,
                  marginRight: 15,
                  flex: 1,
                }}
              >
                {Data[0].trip_to_address}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <Text
              style={{
                fontSize: 21,
                fontFamily: fonts.PoppinsBold,
                color: "black",
                marginTop: 17,
                marginLeft: 3,
              }}
            >
              {Data[0].trip_stage_status == "Started" &&
                translation[131][selectedLanguages].trim()}
              {/* "You are heading to your direction" */}

              {Data[0].trip_stage_status == "Accepted" &&
                translation[85][selectedLanguages].trim()}

              {/* The driver is on its way */}
            </Text>

            {/* <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "gray",
                  marginTop: 7,
                  marginLeft:5
                }}>
                  
                Estimated pick up time:
                {Data[0].trip_stage_status == "Started" &&
                  translation[91][selectedLanguages].trim()}

                {Data[0].trip_stage_status == "Accepted" &&
                  translation[91][selectedLanguages].trim()}
              </Text>
            </View> */}
          </View>

          <ScrollView>
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                marginLeft: 15,
                marginRight: 15,
                marginTop: "6%",
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                marginBottom: 10,
                paddingBottom: 5,
              }}
            >
              <View
                style={{
                  height: 60,
                  width: 60,
                  marginLeft: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 100 / 2,
                }}
              >
                <Image
                  source={{
                    uri: `${Data[0].dp}`,
                  }}
                  resizeMode="cover"
                  style={{
                    height: 60,
                    width: 60,

                    borderRadius: 100 / 2,
                  }}
                />
              </View>

              <View
                style={{
                  marginLeft: 15,
                  borderWidth: 0,
                  marginTop: 20,
                  flex: 1,
                  marginRight: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 21,
                      fontFamily: fonts.PoppinsBold,
                      color: "black",
                    }}
                  >
                    {Data[0].name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                    marginTop: 8,
                  }}
                >
                  {Data[0].car_make} {Data[0].car_model}{" "}
                  {Data[0].car_Registration_no}
                </Text>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "black",
                      marginTop: 8,
                      alignSelf: "center",
                    }}
                  >
                    {Data[0].ride_expected_amount} lv
                  </Text>
                </View>
                {Data[0].trip_stage_status == "Accepted" && (
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Button
                      onPress={() => cancelridenow(Data[0].trip_id)}
                      title={translation[327][selectedLanguages]}
                      color="red"
                      style={"backgroundColor:'red'"}
                    />
                  </View>
                )}
              </View>
              {Data[0].trip_stage_status == "Accepted" && (
                <View
                  style={{
                    borderWidth: 0,
                    borderRadius: 100 / 2,
                    height: 56,
                    width: 56,
                    backgroundColor: colors.yellow,
                    marginTop: "4%",
                    marginLeft: 10,
                    marginRight: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    //  onPress={() => navigation.navigate('Support',{

                    //  })}>

                    onPress={() => checkkey()}
                  >
                    <Image
                      source={message}
                      resizeMode="cover"
                      style={{
                        height: 30,
                        width: 30,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
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
  cancelride,
})(ArrivalStatus);
