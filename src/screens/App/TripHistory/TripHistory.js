/** @format */

import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import AlertModal from "../../../components/AlertModal";
import { CommonActions } from "@react-navigation/routers";
import colors from "../../../theme/colors";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Persons, addphoto, cross } from "../../../assets";
import {
  signin,
  signupwithfb,
  getTriphistory,
  addfavlocation,
  blockdriver,
  adddriverfaviriot,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import fonts from "../../../theme/fonts";
import Headers1 from "../../../components/Headers1";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const TripHistory = ({
  signin,
  route,
  signupwithfb,
  getTriphistory,
  selectedLanguages,
  translation,
  user,
  blockdriver,
  addfavlocation,
  adddriverfaviriot,
}) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [myfaveriot, setmyfaveriot] = useState([]);
  const [selected, setselected] = useState();
  const [placename, setplacename] = useState("");
  const [faveriotdriver, setfaveriotdriver] = useState([]);
  const [msg, setMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [triphistory, settriphistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const fomData = new FormData();
        fomData.append("u_id", user.u_id);

        const res = await getTriphistory(fomData);
        if (res.data.status == true) {
          settriphistory(res.data.data);
        } else {
        }
      })();
    }, [])
  );

  const addfavhandle = () => {
    let longi = "";
    let lati = "";
    let address = "";
    if (selected === true) {
      lati = myfaveriot.trip_from_lat;
      longi = myfaveriot.trip_from_long;
      address = myfaveriot.trip_from_address;
    } else {
      lati = myfaveriot.trip_to_lat;
      longi = myfaveriot.trip_to_long;
      address = myfaveriot.trip_to_address;
    }
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("name", placename);
      fomData.append("location_lat", lati);
      fomData.append("location_long", longi);
      fomData.append("location_address", address);

      const res = await addfavlocation(fomData);
      if (res.data.status == true) {
        setShowAlert(true);
        setMsg(res.data.message);
        setModalVisible1(false);
      } else {
        setModalVisible1(false);
      }
    })();

    setModalVisible1(false);
  };

  const addtofaveretdriver = () => {
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("otheruser_id", faveriotdriver.u_id);

      const res = await adddriverfaviriot(fomData);
      if (res.data.status == true) {
        alert(res.data.message);
      } else {
      }
    })();
    setModalVisible(!isModalVisible);
  };

  const addtoblockdriver = () => {
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      fomData.append("otheruser_id", faveriotdriver.u_id);

      const res = await blockdriver(fomData);
      if (res.data.status == true) {
        alert(res.data.message);
      } else {
      }
    })();

    setModalVisible(!isModalVisible);
  };

  const toggleModal = (item) => {
    setModalVisible(!isModalVisible);
    setfaveriotdriver(item);
  };

  const toggleModalfrom = (item) => {
    setmyfaveriot(item);
    setselected(true);
    setModalVisible1(!isModalVisible1);
  };

  const toggleModalto = (item) => {
    setmyfaveriot(item);
    setselected(false);
    setModalVisible1(!isModalVisible1);
  };

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const closemodal = () => {
    setModalVisible(!isModalVisible);
  };
  const closemodal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const Item = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 4,
          elevation: 5,
          borderRadius: 10,
          paddingBottom: 10,
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },

            paddingBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular }}>
                {item.time}
              </Text>
              <Text style={{ fontSize: 14, fontFamily: fonts.PoppinsRegular }}>
                {item.date}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontFamily: fonts.PoppinsRegular }}>
                {/* Car Reg No */}
                {translation[164][selectedLanguages]} {item.car_Registration_no}
              </Text>

              {/*  */}

              {item.ride_status == "rejected" && (
                <View
                  style={{
                    backgroundColor: "#2E8E22",

                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {/* {translation[51][selectedLanguages]} */}
                    {item.ride_status}
                  </Text>
                </View>
              )}
              {item.ride_status == "incomplete" && (
                <View
                  style={{
                    backgroundColor: colors.yellow,

                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {/* {translation[51][selectedLanguages]} */}
                    {item.ride_status}
                  </Text>
                </View>
              )}
              {item.ride_status == "complete" && (
                <View
                  style={{
                    backgroundColor: "#2E8E22",

                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {/* {translation[51][selectedLanguages]} */}
                    {item.ride_status}
                  </Text>
                </View>
              )}

              {item.ride_status == "unresponded" && (
                <View
                  style={{
                    backgroundColor: "#E4DE1C",

                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {/* {translation[51][selectedLanguages]} */}
                    {item.ride_status}
                  </Text>
                </View>
              )}

              {item.ride_status == "declined" && (
                <View
                  style={{
                    backgroundColor: "#EE517A",

                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {/* {translation[51][selectedLanguages]} */}
                    {item.ride_status}
                  </Text>
                </View>
              )}

              {item.ride_status == "cancel" && (
                <View
                  style={{
                    backgroundColor: "#E4DE1C",

                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {/* {translation[51][selectedLanguages]} */}
                    {item.ride_status}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              borderWidth: 0,
              flexDirection: "row",
              paddingHorizontal: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => toggleModal(item)}
              style={{ width: "28%", top: 20 }}
            >
              <Image
                source={{
                  uri: `${item.dp}`,
                }}
                style={{ height: 80, width: 80, borderRadius: 80 / 2 }}
              />
            </TouchableOpacity>
            <View style={{ width: "40%", marginLeft: 15, top: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.name}
              </Text>

              {item.ride_status == "complete" && (
                <Text
                  style={{
                    paddingVertical: 5,
                    fontFamily: fonts.PoppinsRegular,
                  }}
                >
                  {item.ride_paid_amount} lv
                </Text>
              )}

              <View style={{ flexDirection: "row", flex: 1, marginRight: -70 }}>
                <Foundation name="marker" color={"red"} size={22} />

                <TouchableOpacity onPress={() => toggleModalfrom(item)}>
                  <Text
                    style={{ fontFamily: fonts.PoppinsRegular, marginLeft: 10 }}
                  >
                    {item.trip_from_address}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginLeft: -10,
                  marginTop: -5,
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color={"red"}
                  size={30}
                />
              </View>

              <View style={{ flexDirection: "row", flex: 1, marginRight: -70 }}>
                <Foundation
                  name="marker"
                  color={"red"}
                  size={22}
                  style={{ marginTop: 10 }}
                />

                <TouchableOpacity onPress={() => toggleModalto(item)}>
                  <Text
                    style={{
                      paddingTop: 10,
                      marginLeft: 10,
                      fontFamily: fonts.PoppinsRegular,
                    }}
                  >
                    {item.trip_to_address}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

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
              paddingBottom: 30,
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
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>
                {/* Mark as */}
                {translation[110][selectedLanguages].trim()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={addtofaveretdriver}
                style={{
                  backgroundColor: colors.yellow,
                  width: "40%",
                  borderRadius: 15,
                  height: 30,
                  justifyContent: "center",
                  paddingLeft: 15,
                }}
              >
                <Text style={{ fontSize: 16, color: "black" }}>
                  {/* Favorite */}
                  {translation[111][selectedLanguages]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addtoblockdriver}
                style={{
                  backgroundColor: "red",
                  width: "40%",
                  borderRadius: 15,
                  height: 30,
                  justifyContent: "center",
                  paddingLeft: 15,
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>
                  {/* Block */}
                  {translation[112][selectedLanguages]}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={closemodal}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: colors.yellow, fontSize: 16 }}>
                  {/* Cancel */}
                  {translation[99][selectedLanguages]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible1}
        >
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
                  setModalVisible1(false);
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
                {/* Please Give name to your this address */}
                {translation[293][selectedLanguages].trim()}
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
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title={translation[13][selectedLanguages].trim()}
        // "Trip History"
      />
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <FlatList
          data={triphistory}
          renderItem={Item}
          keyExtractor={(item) => item}
        />
        {showAlert && (
          <AlertModal
            heading={msg}
            button1={translation[185][selectedLanguages]}
            // button1="OK"
            button2={translation[99][selectedLanguages]}
            // button2="Cancel"
            form="abc"
            onOkPress={() => {
              setShowAlert(false);
            }}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "110%",
    width: "110%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  inputContainer: {
    justifyContent: "center",
  },
  input: {
    height: 50,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: colors.primary,
    marginTop: 50,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 40 : 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
  },
});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  getTriphistory,
  addfavlocation,
  blockdriver,
  adddriverfaviriot,
})(TripHistory);
