/** @format */

import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";

import axios from "axios";
import CustomText from "../../../components/Text";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import auth from "@react-native-firebase/auth";
//logo
import {
  Persons,
  arrowright,
  cross,
  house,
  Circled_favorite_off,
  Iconpaymen,
  cash,
  debit,
  P,
} from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";
import Headers1 from "../../../components/Headers1";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//redux
import {
  signin,
  signupwithfb,
  rideaccepted,
  driverList,
  placeorder,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import Modal from "react-native-modal";
import { Header, Badge } from "react-native-elements";
import fonts from "../../../theme/fonts";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import CountDown from "react-native-countdown-component";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
var data = [1, 2, 3];
const ListDriver = ({
  signin,
  route,
  signupwithfb,
  driverList,
  translation,
  selectedLanguages,
  user,
  placeorder,
  rideaccepted,
}) => {
  const navigation = useNavigation();

  const [intervell, setintervell] = useState(false);

  const [timeer, settimeer] = useState("");

  const [drivers, setdrivers] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [msg, setMsg] = useState("");
  const [testing, settesting] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [driversdetail, setdriversdetail] = useState([]);
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(true);
  const tripstatus = route.params;

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);

      (async () => {
        const fomData = new FormData();
        fomData.append("from_lat", tripstatus.picklati);
        fomData.append("from_longi", tripstatus.picklongi);
        fomData.append("u_id", user.u_id);
        fomData.append("to_lat", tripstatus.droplati);
        fomData.append("to_longi", tripstatus.droplongo);
        console.log("myformdata===>1", fomData);
        const res = await driverList(fomData);

        if (res.data.status == true) {
          setdrivers(res.data.data);
          setmessage(res.data.message);
        } else {
          setdrivers("");
          setmessage(res.data.message);
        }
        setloading(false);
      })();
    }, [tripstatus])
  );

  console.log("driversdetail", driversdetail);
  const handlefinish = async (text) => {
    setModalVisible(!isModalVisible);
  };

  const placeride = async (text) => {
    const formData = new FormData();
    formData.append("u_id", user.u_id);
    formData.append("driver_id", driversdetail.u_id);
    formData.append("from_address", tripstatus.pickadd);
    formData.append("from_lat", tripstatus.picklati);
    formData.append("from_long", tripstatus.picklongi);
    formData.append("to_long_address", tripstatus.dropadd);
    formData.append("to_lat", tripstatus.droplati);
    formData.append("to_long", tripstatus.droplongo);
    formData.append("est_amt", driversdetail.estimateamt);
    formData.append("total_distance", driversdetail.totaldistance);
    const res = await placeorder(formData);
    console.log("myresponse", res);
    if (res.data.status == true) {
      settimeer(res.data.data.time);
      setintervell(true);
      setModalVisible1(false);
      setModalVisible(true);
    } else {
      setModalVisible1(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let j = 0;
      const api_interval = setInterval(() => {
        (async () => {
          const fomData = new FormData();

          fomData.append("u_id", user.u_id);
          const res = await rideaccepted(fomData);
          console.log("apiresponsedata", res);

          if (res.data.status === true) {
            setModalVisible(false);
            navigation.navigate("ArrivalStatus");
          } else if (res.data.status === 0) {
            // settripid("21");
            // settesting();

            setModalVisible(false);

            alert(res.data.message);
            // "Driver has rejected your request,Pls choose another one."
            // setShowAlert1(true);
          }
        })();
      }, 7000);
      return () => {
        clearInterval(api_interval);
      };
    })
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = (item) => {
    setdriversdetail(item);
    setModalVisible1(true);
  };
  const closemodal = () => {
    setModalVisible(false);
  };
  const closemodal1 = () => {
    setModalVisible1(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => toggleModal1(item)}
          style={{
            flex: 1,
            marginHorizontal: 20,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginBottom: 5,
            borderRadius: 10,
            paddingVertical: 10,
            marginTop: 15,
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  width: "18%",
                }}
              >
                <Image
                  source={{
                    uri: `${item.dp}`,
                  }}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 80 / 2,
                  }}
                />
              </View>
              <View
                style={{
                  width: "60%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 6,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  {item.is_fav != "No" && (
                    <Entypo
                      name="heart"
                      color={"red"}
                      size={20}
                      style={{
                        marginLeft: 10,
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "gray",
                  }}
                >
                  {item.time_distance}
                </Text>
              </View>

              <View
                style={{
                  width: "15%",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginLeft: -18,
                  }}
                >
                  {item.estimateamt}lv
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Loading visible={loading} />
      <SafeAreaView>
        <Headers1
          title={translation[150][selectedLanguages].trim()}
          //  title='List of drivers'
          screen={"false"}
        />

        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,

              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              paddingBottom: 60,
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
                  closemodal();
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
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 150 / 2,
                  borderWidth: 3,
                  borderColor: colors.yellow,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CountDown
                  size={30}
                  until={timeer}
                  digitStyle={{
                    borderWidth: 0,
                  }}
                  digitTxtStyle={{
                    color: colors.black,
                  }}
                  onFinish={() => handlefinish()}
                  // separatorStyle={{color: colors.yellow}}
                  timeToShow={["S"]}
                  timeLabels={{ s: null }}
                />
                {/* <Text style={{ fontSize: 40, fontWeight: "bold" }}>60</Text> */}
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                }}
              >
                {/* Ride request has been sent to driver. */}
                {translation[116][selectedLanguages]}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                }}
              >
                {/* Please wait for driver's response */}
                {translation[117][selectedLanguages]}
              </Text>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible1}
        >
          <ScrollView
            style={{
              // justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,

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
                alignItems: "flex-end",
                paddingRight: 10,
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closemodal1();
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
            <View style={{ marginTop: 10 }}>
              <Image
                source={{
                  uri: `${driversdetail.picture_of_car}`,
                }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 15,
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: `${driversdetail.dp}`,
                  }}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100 / 2,
                    position: "absolute",
                  }}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 60,
                  width: "45%",
                  justifyContent: "space-between",
                }}
              >
                {driversdetail.rating >= 1 ? (
                  <AntDesign name="star" color={colors.yellow} size={15} />
                ) : (
                  <AntDesign name="staro" color={colors.yellow} size={15} />
                )}
                {driversdetail.rating >= 2 ? (
                  <AntDesign name="star" color={colors.yellow} size={15} />
                ) : (
                  <AntDesign name="staro" color={colors.yellow} size={15} />
                )}
                {driversdetail.rating >= 3 ? (
                  <AntDesign name="star" color={colors.yellow} size={15} />
                ) : (
                  <AntDesign name="staro" color={colors.yellow} size={15} />
                )}
                {driversdetail.rating >= 4 ? (
                  <AntDesign name="star" color={colors.yellow} size={15} />
                ) : (
                  <AntDesign name="staro" color={colors.yellow} size={15} />
                )}
                {driversdetail.rating >= 5 ? (
                  <AntDesign name="star" color={colors.yellow} size={15} />
                ) : (
                  <AntDesign name="staro" color={colors.yellow} size={15} />
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    (
                  </Text>
                  {driversdetail.is_fav == "Yes" && (
                    <Entypo name="heart" color={"red"} size={15} />
                  )}
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {driversdetail.no_of_people_rated}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                    }}
                  >
                    )
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
              }}
            >
              <View
                style={{
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {/* Details */}
                  {translation[86][selectedLanguages]}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <FontAwesome5 name="car" color={colors.darkgray} size={20} />
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                    }}
                  >
                    {driversdetail.car_type}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <FontAwesome5
                    name="user-friends"
                    color={colors.darkgray}
                    size={20}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                    }}
                  >
                    {driversdetail.no_of_passenger}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <FontAwesome5
                    name="luggage-cart"
                    color={colors.darkgray}
                    size={20}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                    }}
                  >
                    {driversdetail.no_of_luggage_for_car}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {translation[89][selectedLanguages]}
                  {/* Charges */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <FontAwesome5
                    name="address-card"
                    color={colors.darkgray}
                    size={20}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                    }}
                  >
                    {/* Initial fee */}
                    {translation[90][selectedLanguages].trim()}
                  </Text>
                </View>
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                      marginLeft: -15,
                    }}
                  >
                    {driversdetail.initial_fee_day}lv
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <FontAwesome5
                    name="address-card"
                    color={colors.darkgray}
                    size={20}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                    }}
                  >
                    {/* Charges per km */}
                    {translation[92][selectedLanguages].trim()}
                  </Text>
                </View>
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                      marginLeft: -13,
                    }}
                  >
                    {driversdetail.rate_per_km_day}lv
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <FontAwesome5
                    name="address-card"
                    color={colors.darkgray}
                    size={20}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                    }}
                  >
                    {/* Charges per stay */}
                    {translation[93][selectedLanguages].trim()}
                  </Text>
                </View>
                <View
                  style={{
                    width: "10%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.darkgray,
                      marginLeft: -11,
                    }}
                  >
                    {driversdetail.price_per_minute_stay_day}lv
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {/* Acceptable payment method */}
                  {translation[94][selectedLanguages].trim()}
                </Text>
              </View>
              {/* /////////////////////////////////////////////////// */}
              {driversdetail.payment_method_accept == "Both" && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "45%",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={cash}
                      style={{
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingLeft: 5,
                      }}
                    >
                      {/* Credit Card */}
                      {/* {driversdetail.payment_method_accept} */}

                      {translation[95][selectedLanguages].trim()}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "45%",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={debit}
                      style={{
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingLeft: 5,
                      }}
                    >
                      {/* Cash */}
                      {translation[96][selectedLanguages].trim()}
                    </Text>
                  </View>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {driversdetail.payment_method_accept == "Card" && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "45%",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={cash}
                      style={{
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingLeft: 5,
                      }}
                    >
                      {/* Credit Card */}
                      {/* {driversdetail.payment_method_accept} */}

                      {translation[95][selectedLanguages].trim()}
                    </Text>
                  </View>
                )}
                {driversdetail.payment_method_accept == "Cash" && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "45%",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={debit}
                      style={{
                        height: 50,
                        width: 50,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingLeft: 5,
                      }}
                    >
                      {/* Cash */}
                      {translation[96][selectedLanguages].trim()}
                    </Text>
                  </View>
                )}
              </View>

              {/* /////////////////////////////////////////////////////// */}

              {/* //////////////////////////// */}
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-between",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <View>
                  <Image
                    resizeMode="contain"
                    source={Iconpaymen}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {/* Approx.Price: */}
                    {translation[97][selectedLanguages].trim()}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                {driversdetail.estimateamt}lv
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  color: colors.darkgray,
                }}
              >
                {translation[243][selectedLanguages]}
                {/* Terms & condition may apply */}
              </Text>
            </View>
            <View style={{}}>
              <GradientButton
                title={translation[98][selectedLanguages].trim()}
                // "Ride"
                iconRight={arrowright}
                onButtonPress={placeride}
              />
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible1(false)}
              style={{
                flex: 1,
                height: 45,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: colors.yellow,
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {/* Cancel */}
                {translation[99][selectedLanguages]}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>

        <View>
          <FlatList
            data={drivers}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
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

        {drivers == "" && (
          <KeyboardAwareScrollView contentContainerStyle={{}}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
                marginHorizontal: 20,
                // backgroundColor: "green",
              }}
            >
              <Image
                source={P}
                style={{ width: 200, height: 250, margin: 20 }}
                resizeMode="contain"
              />
            </View>
            <View style={{}}>
              {/* <CustomText
                // title={"Transaction declined"}
                title={translation[161][selectedLanguages]}
                type={"large"}
                color={"black"}
                style={{
                  fontSize: 24,
                  alignSelf: "center",
                  marginTop: 20,
                  fontFamily: fonts.PoppinsBold,
                }}
              /> */}
              <CustomText
                title={message}
                // title= {"Payment didn't come through"}
                type={"normal"}
                color={"black"}
                style={{
                  fontSize: 16,
                  alignSelf: "center",
                  marginTop: 5,
                  marginBottom: 10,
                }}
              />
            </View>
          </KeyboardAwareScrollView>
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
  driverList,
  placeorder,
  rideaccepted,
})(ListDriver);
