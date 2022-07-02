/** @format */

import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
} from "react-native";
import { updatetoken } from "../../../redux/actions/auth";
import messaging from "@react-native-firebase/messaging";
import { connect } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
import AlertModal from "../../../components/AlertModal";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Header, Badge } from "react-native-elements";
import Octicons from "react-native-vector-icons/Octicons";
import { cross } from "../../../assets";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { notificationListener } from "../../../components/Notificationservice";
import { addfavlocation } from "../../../redux/actions/auth";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import colors from "../../../theme/colors";
import Modal from "react-native-modal";
import SelectDropdown from "react-native-select-dropdown";
import TrackPlayer from "react-native-track-player";
const Map = ({
  route,
  updatetoken,
  selectedLanguages,
  user,
  addfavlocation,
  translation,
}) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const loc = route.params;
  const [selected, setselected] = useState();
  const [placename, setplacename] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [msg, setMsg] = useState("");
  const [pickupadd, setpickupadd] = useState();
  const [pickuplati, setpickuplati] = useState();
  const [pickuplongi, setpickuplongi] = useState();
  const [dropoffadd, setdropoffadd] = useState();
  const [dropofflati, setdropofflati] = useState();
  const [dropofflongi, setdropofflongi] = useState();
  const [currentLongitude, setCurrentLongitude] = useState("33.684422"); //41.599114322572305
  const [currentLatitude, setCurrentLatitude] = useState("73.047882"); //25.383118707686663
  const [address, setaddress] = useState();
  const [region, setRegion] = useState({
    latitude: 33.684422, ////42.7339
    longitude: 73.047882, ////25.4858
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  try {
    Geolocation.getCurrentPosition(
      //Will give you the current location

      (position) => {
        console.log("positionmap1", position);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setCurrentLongitude(currentLongitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        if (error.code == 2) {
          alert(translation[349][selectedLanguages]);
        }
        console.log("positionmap", error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  } catch (e) {}

  const droploc = () => {
    navigation.navigate("PlacesApi", {
      stat: false,
      screen: "Map",
      datee: new Date().getTime(),
    });
  };

  const pickloc = () => {
    navigation.navigate("PlacesApi", {
      stat: true,
      screen: "Map",
      datee: new Date().getTime(),
    });
  };

  // (async () => {
  //   Geolocation.getCurrentPosition((position) => {
  //     const currentLongitude = JSON.stringify(position.coords.longitude);
  //     const currentLatitude = JSON.stringify(position.coords.latitude);

  //     setCurrentLongitude(currentLongitude);
  //     setCurrentLatitude(currentLatitude);
  //   });
  // })();

  // useEffect(() => {
  //   fetch(
  //     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  //       currentLatitude +
  //       "," +
  //       currentLongitude +
  //       "&key=" +
  //       API_KEY
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setaddress(
  //         responseJson.results[0].address_components[1].long_name.replace(
  //           /['"]+/g,
  //           ""
  //         )
  //       );
  //     });
  // }, [currentLongitude, currentLatitude]);

  useEffect(() => {
    if (loc != undefined) {
      if (loc.addres1 != undefined) {
        setdropoffadd(loc.addres1);
        setdropofflati(loc.Latitude1);
        setdropofflongi(loc.Longitude1);

        if (loc.addres != undefined) {
          setpickupadd(loc.addres);
          setpickuplati(loc.Latitude);
          setpickuplongi(loc.Longitude);
        } else {
          setpickupadd(address);
          setpickuplati(currentLatitude);
          setpickuplongi(currentLongitude);
        }
      }
    }
  });
  const ConfirmAddress = () => {
    let a = {
      pickadd: pickupadd,
      picklati: pickuplati,
      picklongi: pickuplongi,
      dropadd: dropoffadd,
      droplati: dropofflati,
      droplongo: dropofflongi,
    };

    console.log("myconsole===>", a);

    navigation.navigate("ListDriver", a);
  };

  const start2 = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();
    //   // Add a track to the queue
    await TrackPlayer.add({
      id: "trackId",
      url: require("../../../assets/images/Definite.mp3"),
      title: "Track Title",
      artist: "Track Artist",
      artwork: "https://picsum.photos/300",
    });
    // Start playing it
    await TrackPlayer.play();
  };

  //////////////////////notification code
  messaging().onMessage(async (remoteMessage) => {
    console.log("push notification 0", remoteMessage.data);
    // console.log(`received in foreground data123 `);
  });

  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      console.log(`push notification 1`, remoteMessage.data);
      if (remoteMessage.data?.scree_name == "chatting") {
        start2();
      }
    });
  }, [notificationListener]);

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log("push notification 2", remoteMessage.data); //ye tb fire hogajb hm notification ko click krien gy

    if (remoteMessage.data.scree_name == "support") {
      const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
      const receiverid = remoteMessage.data.receiverid; // 12;
      const roomkey = remoteMessage.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
      const screen = remoteMessage.data.screen; //`support`;
      const dname = remoteMessage.data.dname; //"Support";

      navigation.navigate("Support", {
        dname: dname,
        messagekey: messagekey,
        receiverid: receiverid,
        roomkey: roomkey,
        screen: screen,
      });
    } else if (remoteMessage.data.scree_name == "chatting") {
      const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
      const receiverid = remoteMessage.data.receiverid; // 12;
      const screen = remoteMessage.data.screen; //`support`;
      const dname = remoteMessage.data.dname; //"Support";
      const devicetoken = remoteMessage.data.devicetokennew;

      navigation.navigate("chatting", {
        dname: dname,
        messagekey: messagekey,
        receiverid: receiverid,
        screen: screen,
        devicetoken: devicetoken,
      });
    }
  });
  useEffect(() => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("push notification 3", remoteMessage); //jb background me hogi app to ye fire hoga
      if (remoteMessage.data.scree_name == "support") {
        const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
        const receiverid = remoteMessage.data.receiverid; // 12;
        const roomkey = remoteMessage.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
        const screen = remoteMessage.data.screen; //`support`;
        const dname = remoteMessage.data.dname; //"Support";

        navigation.navigate("Support", {
          dname: dname,
          messagekey: messagekey,
          receiverid: receiverid,
          roomkey: roomkey,
          screen: screen,
        });
      } else if (remoteMessage.data.scree_name == "chatting") {
        const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
        const receiverid = remoteMessage.data.receiverid; // 12;
        const screen = remoteMessage.data.screen; //`support`;
        const dname = remoteMessage.data.dname; //"Support";
        const devicetoken = remoteMessage.data.devicetokennew;

        navigation.navigate("chatting", {
          dname: dname,
          messagekey: messagekey,
          receiverid: receiverid,
          screen: screen,
          devicetoken: devicetoken,
        });
      }
    });

    PushNotification.configure({
      onNotification: (notification) => {
        if (notification.userInteraction == true) {
          if (notification.data.scree_name == "support") {
            const messagekey = notification.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = notification.data.receiverid; // 12;
            const roomkey = notification.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
            const screen = notification.data.screen; //`support`;
            const dname = notification.data.dname; //"Support";

            navigation.navigate("Support", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              roomkey: roomkey,
              screen: screen,
            });
          } else if (notification.data.scree_name == "chatting") {
            const messagekey = notification.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = notification.data.receiverid; // 12;
            const screen = notification.data.screen; //`support`;
            const dname = notification.data.dname; //"Support";
            const devicetoken = notification.data.devicetokennew;

            navigation.navigate("chatting", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              screen: screen,
              devicetoken: devicetoken,
            });
          }
        }
      },
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("push notification 5", remoteMessage); //app kill krny k bad jo notification aye us pr jb click krien gy to ye code fire hoga

          if (remoteMessage.data.scree_name == "support") {
            const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = remoteMessage.data.receiverid; // 12;
            const roomkey = remoteMessage.data.roomkey; //`rooms/-N1lmWrR9sKquJ-3nYnx`;
            const screen = remoteMessage.data.screen; //`support`;
            const dname = remoteMessage.data.dname; //"Support";

            navigation.navigate("Support", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              roomkey: roomkey,
              screen: screen,
            });
          } else if (remoteMessage.data.scree_name == "chatting") {
            const messagekey = remoteMessage.data.messagekey; //`messages/-N1lmXPZ6A3VH2b8iCD-`;
            const receiverid = remoteMessage.data.receiverid; // 12;
            const screen = remoteMessage.data.screen; //`support`;
            const dname = remoteMessage.data.dname; //"Support";
            const devicetoken = remoteMessage.data.devicetokennew;

            navigation.navigate("chatting", {
              dname: dname,
              messagekey: messagekey,
              receiverid: receiverid,
              screen: screen,
              devicetoken: devicetoken,
            });
          }
        }
      });
  }, [notificationListener]);

  useFocusEffect(
    React.useCallback(() => {
      hello();
    }, [])
  );

  const hello = () => {
    (async () => {
      const fcmToken = await messaging().getToken();

      const fomData = new FormData();

      fomData.append("u_id", user.u_id);
      fomData.append("token", fcmToken);
      console.log("fomData===>", fomData);
      const res = await updatetoken(fomData, navigation);

      if (
        res.data.trip_status == "Started" ||
        res.data.trip_status == "Accepted"
      ) {
        navigation.navigate("ArrivalStatus");
      } else if (res.data.trip_status == "payment") {
        navigation.navigate("RideAmmount");
      } else if (res.data.trip_status == "rate") {
        navigation.navigate("Ratings", {
          Dataa: res.data,
          tripid: res.data.data.trip_id,
        });
      }
    })();
  };

  useFocusEffect(
    React.useCallback(() => {
      let j = 0;
      const api_interval = setInterval((i) => {
        hello();
      }, 7000);
      return () => {
        clearInterval(api_interval);
      };
    }, [])
  );

  /////////////////add to fav

  const addfavhandle = () => {
    let longi = "";
    let lati = "";
    let addres = "";
    if (selected === false) {
      if (loc != undefined) {
        if (loc.addres == undefined) {
          lati = currentLatitude;
          longi = currentLongitude;
          addres = address;
        } else {
          lati = loc.Latitude;
          longi = loc.Longitude;
          addres = loc.addres;
        }
      } else {
        lati = currentLatitude;
        longi = currentLongitude;
        addres = address;
      }
    } else {
      lati = loc.Latitude1;
      longi = loc.Longitude1;
      addres = loc.addres1;
    }

    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("name", placename);
      fomData.append("location_lat", lati);
      fomData.append("location_long", longi);
      fomData.append("location_address", addres);

      const res = await addfavlocation(fomData);
      if (res.data.status == true) {
        setLoading(false);
        setShowAlert1(true);
        setMsg(res.data.message);
        setShowAlert(false);
      } else {
        setLoading(false);

        setMsg(res.data.message);
        setShowAlert(false);
      }
    })();
  };
  const additemtofav = (item) => {
    setselected(true);
    setShowAlert(!showAlert);
  };

  const additemfromfav = (item) => {
    setselected(false);
    setShowAlert(!showAlert);
  };

  /////////////////////
  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          marginVertical: 5,
        }}
        backgroundColor={"transparent"}
        leftComponent={
          <Octicons
            name={"three-bars"}
            size={30}
            color={colors.yellow}
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{}}
          />
        }
      />
      <Loading visible={loading} />

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(currentLatitude),
          longitude: parseFloat(currentLongitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={(region) => setRegion(region)}
        showsTraffic={true}
      >
        <Marker
          coordinate={region}
          pinColor={"red"} // any color
          title={"title"}
          description={"description"}
        />
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: 100,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.yellow,
            marginHorizontal: 30,
            height: 45,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {translation[100][selectedLanguages].trim()}
            {/* Start my Tour */}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginHorizontal: 31,
            paddingVertical: 20,
            paddingLeft: 30,
            marginBottom: 1,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Foundation
              name="marker"
              color={"red"}
              size={24}
              style={{ marginTop: 5 }}
            />
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("PlacesApi")} */}

            {/* style={{ marginTop: 5, width: "80%" }}> */}
            {loc == undefined && (
              <TouchableOpacity
                onPress={() => pickloc()}
                style={{
                  marginTop: 5,
                  width: "80%",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 1,
                    marginLeft: 10,
                  }}
                >
                  {address}
                </Text>
              </TouchableOpacity>
            )}

            {loc != undefined && (
              <TouchableOpacity
                onPress={() => pickloc()}
                style={{
                  marginTop: 5,
                  width: "80%",
                }}
              >
                {loc.addres != undefined && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: "gray",
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      paddingBottom: 1,
                      marginLeft: 10,
                    }}
                  >
                    {loc.addres}
                  </Text>
                )}
                {loc.addres == undefined && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: "gray",
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      paddingBottom: 1,
                      marginLeft: 10,
                    }}
                  >
                    {address}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: "0%",
              marginLeft: "40%",
            }}
          >
            <TouchableOpacity
              style={{ padding: 7 }}
              onPress={() => additemfromfav()}
            >
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 12,
                  color: "black",
                  marginLeft: 20,
                }}
              >
                {translation[157][selectedLanguages].trim()}
                {/* Mark as my favorite */}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginLeft: -10,
              marginTop: -10,
            }}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              color={"red"}
              size={30}
            />
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Foundation
              name="marker"
              color={"red"}
              size={24}
              style={{ marginTop: 5 }}
            />
            {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "PlacesApi", {loc: true}
                )
              } */}
            {loc == undefined && (
              <TouchableOpacity
                onPress={() => droploc()}
                style={{
                  marginTop: 5,
                  width: "80%",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "gray",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 10,
                  }}
                >
                  {translation[102][selectedLanguages].trim()}
                  {/* Take me to */}
                </Text>
              </TouchableOpacity>
            )}
            {loc != undefined && (
              <TouchableOpacity
                onPress={() => droploc()}
                style={{
                  marginTop: 5,
                  width: "80%",
                }}
              >
                {loc.addres1 != undefined && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: "gray",
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      paddingBottom: 1,
                      marginLeft: 10,
                    }}
                  >
                    {loc.addres1}
                  </Text>
                )}
                {loc.addres1 == undefined && (
                  <Text
                    style={{
                      fontSize: 15,
                      color: "gray",
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      paddingBottom: 1,
                      marginLeft: 10,
                    }}
                  >
                    {translation[102][selectedLanguages]}
                    {/* Take me to */}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
          {loc != undefined && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",

                marginTop: 10,
                marginLeft: "40%",
              }}
            >
              {loc.addres1 != undefined && (
                <TouchableOpacity
                  style={{ padding: 7 }}
                  onPress={() => additemtofav()}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "black",
                      marginLeft: 20,
                    }}
                  >
                    {translation[157][selectedLanguages]}
                    {/* Mark as my favorite */}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {loc != undefined && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "-6%",
                marginRight: "2%",
                marginTop: 10,
              }}
            >
              {loc.addres1 != undefined && (
                <TouchableOpacity
                  onPress={() => ConfirmAddress()}
                  style={{
                    width: "75%",
                    height: 35,
                    marginTop: 20,
                    backgroundColor: colors.yellow,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {translation[158][selectedLanguages].trim()}
                    {/* Start Trip */}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <Modal animationType="slide" transparent={true} isVisible={showAlert}>
            <View
              style={{
                backgroundColor: "#FBFBFB",
                borderRadius: 7,
                position: "absolute",
                alignSelf: "center",
                flex: 0.4,
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  paddingRight: 10,
                  paddingTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setShowAlert(false);
                  }}
                >
                  <Image
                    source={cross}
                    resizemode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 60,
                  marginLeft: 22,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    paddingVertical: 5,
                    paddingRight: 10,
                  }}
                >
                  {translation[293][selectedLanguages].trim()}
                  {/* Please Give name to your this address */}
                </Text>
              </View>
              <View
                style={{
                  paddingBottom: 20,
                }}
              >
                <TextInput
                  style={{
                    width: "90%",
                    height: 50,
                    marginTop: 20,
                    alignSelf: "center",

                    borderBottomWidth: 1,
                    alignContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onChangeText={(name) => setplacename(name)}
                  placeholderTextColor="black"
                  color="black"
                />
              </View>

              <TouchableOpacity
                onPress={() => addfavhandle()}
                style={{
                  marginBottom: 20,
                  width: "90%",
                  height: 50,
                  marginTop: 20,
                  alignSelf: "center",
                  backgroundColor: colors.yellow,
                  borderRadius: 13,
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                  }}
                >
                  {/* Submit */}
                  {translation[115][selectedLanguages].trim()}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      {showAlert1 && (
        <AlertModal
          heading={msg}
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          button2={translation[99][selectedLanguages]}
          // button2="Cancel"
          form="abc"
          onOkPress={() => {
            setShowAlert1(false);
          }}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return {
    user,
    selectedLanguages,
    translation,
  };
};
export default connect(mapStateToProps, {
  updatetoken,
  addfavlocation,
})(Map);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "88%",
  },
  text: {
    fontSize: 20,
    backgroundColor: "lightblue",
  },
});
