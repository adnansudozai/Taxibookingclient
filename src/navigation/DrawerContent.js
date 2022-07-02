import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AlertModal from "../components/AlertModal";
import database from "@react-native-firebase/database";

import {
  Persons,
  Home,
  Profile1,
  Address,
  Trip,
  Wallet,
  Block,
  Support,
  Terms,
  Logout1,
} from "../assets";
import { TouchableOpacity } from "react-native";
import {
  logoutSuccess,
  getlanguage,
  selectedlanguage,
} from "../redux/actions/auth";
import { CommonActions } from "@react-navigation/routers";
import { connect } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";

const roomRef = database().ref("rooms");

const DrawerContent = ({
  props,
  navigation,
  balance,
  getUserBalance,
  user,
  logoutUser,
  isLoggedIn,
  updateCart,
  translation,
  selectedLanguages,
  logoutSuccess,
  selectedlanguage,
  getlanguage,
}) => {
  const [senderid, setsenderid] = useState(user != null ? user.u_id : "");
  const [receiverid, setreceiverid] = useState(0);
  const [indexid, setindexid] = useState("");
  console.log("selected language is", user);
  console.log("user working status", selectedLanguages);
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
          });
        });
        const res = roomsFB?.some((element) => {
          return (
            (element.recv_uid == senderid && element.send_uid == receiverid) ||
            (element.recv_uid == receiverid && element.send_uid == senderid)
          );
        });
        console.log(res);
        if (res) {
          const index = roomsFB.find((element) => {
            return (
              (element.recv_uid == senderid &&
                element.send_uid == receiverid) ||
              (element.recv_uid == receiverid && element.send_uid == senderid)
            );
          });
          setindexid(`messages/${index.key}`);
          navigation.navigate("Support", {
            dname: "Support",
            messagekey: `messages/${index.key}`,
            receiverid: receiverid,
            roomkey: `rooms/${index.key}`,
            screen: "support",
          });
        } else {
          addRoom();
        }
      });
    } catch (err) {
      console.log(err);
    }
    const addRoom = async (item) => {
      try {
        await roomRef.push({
          send_uid: user.u_id,
          recv_uid: receiverid,
          created_at: new Date().getTime(),
          who_send: user.u_id,
          content: "",
          sender_dp: user.dp,
          device_token: user.device_token,
          name: user.name,
          is_read: "no",
        });
      } catch (err) {
        alert(err);
      }
    };
  };

  /////language api
  const [SelectLang, setSelectLang] = useState("");
  const [Langdata, setLangdata] = useState();

  useEffect(() => {
    // setLoading(true);
    (async () => {
      const res = await getlanguage(user.u_id);
      if (res.data.status == true) {
        // setSelectLang(res.data.data);
        let array1 = [];
        for (var i = 0; i < res.data.data.length; i++) {
          console.log("dataaaaa", res.data.data[i].name, "i is", i);
          array1.push(res.data.data[i].name);
        }
        setSelectLang(array1);
        setLangdata(res.data.userdata);
      } else {
      }
    })();
  }, []);

  const selectlanghandle = async (item) => {
    const fomData = new FormData();

    fomData.append("u_id", user.u_id);
    fomData.append("language", item);

    const res = await selectedlanguage(fomData, item, translation);

    console.log("selected language is", user, fomData);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const logouthandle = () => {
    // if (user.is_first_registered == 0) {
    //   navigation.navigate("EditProfile");
    // }
    setShowAlert(true);
    setMsg(translation[167][selectedLanguages]);
    // "Are you sure you want to logout"
  };

  const yespress = async (id) => {
    setShowAlert(false);

    new Promise((rsl, rej) => {
      logoutSuccess(rsl, rej);
    })
      .then((res) => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Signup" }],
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate("Signup");
  };

  const cancelpress = async (id) => {
    setShowAlert(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <DrawerContentScrollView {...props}>
        {translation && (
          <View>
            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "red",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              {/* <View style={{marginTop:10, 
          backgroundColor: 'pink',
          borderRadius:50/2,
               
               }}> */}
              {user != null && (
                <Image
                  //  source={Persons}
                  source={{
                    uri: `${user.dp}`,
                  }}
                  resizeMode="cover"
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50 / 2,
                    marginTop: 9,
                  }}
                />
              )}

              <View style={{ paddingLeft: 10, paddingTop: 5 }}>
                <Text
                  style={{ fontSize: 16, fontFamily: fonts.PoppinsRegular }}
                >
                  {/* Welcome */}
                  {translation[8][selectedLanguages]}
                </Text>
                {user != null && (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: fonts.PoppinsBold,
                    }}
                  >
                    {user.name}
                  </Text>
                )}
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 23,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.yellow,
                    marginTop: 5,
                    borderRadius: 5,
                  }}
                >
                  {user != null && (
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {user.myblnc}lv
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[11][selectedLanguages]}
                // "Home"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  if (user.is_first_registered == 0) {
                    navigation.navigate("EditProfile");
                  } else {
                    navigation.navigate("Map");
                  }
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Home}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[12][selectedLanguages]}
                //  "My Addresses"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  if (user.is_first_registered == 0) {
                    navigation.navigate("EditProfile");
                  } else {
                    navigation.navigate("MyLocation", {
                      datee: new Date().getTime(),
                    });
                  }
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Address}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              {showAlert && (
                <AlertModal
                  heading={msg}
                  button1={translation[185][selectedLanguages]}
                  // button1="OK"
                  button2={translation[99][selectedLanguages]}
                  // button2="Cancel"
                  onYesPress={yespress}
                  onNoPress={cancelpress}
                  onOkPress={() => {
                    setShowAlert(false);
                  }}
                />
              )}

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[13][selectedLanguages]}
                //  "Trip History"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  if (user.is_first_registered == 0) {
                    navigation.navigate("EditProfile");
                  } else {
                    navigation.navigate("TripHistory");
                  }
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Trip}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[105][selectedLanguages]}
                //  "Blocked Drivers"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  if (user.is_first_registered == 0) {
                    navigation.navigate("EditProfile");
                  } else {
                    navigation.navigate("BlockedDrivers");
                  }
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Block}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[15][selectedLanguages]}
                // "Profile"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  if (user.is_first_registered == 0) {
                    navigation.navigate("EditProfile");
                  } else {
                    navigation.navigate("EditProfile");
                  }
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Profile1}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
              {/* <DrawerItem
            style={{
              marginTop: -5,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
            label=
            // {translation[15][selectedLanguages]}
             "OTP"
            labelStyle={styles.labelStyle}
            onPress={() => {
              navigation.navigate("OTP");
            }}
            icon={({ color, size }) => (
              <Image
                source={Profile1}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            )}
          /> */}
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[16][selectedLanguages]}
                //  "Wallet"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  if (user.is_first_registered == 0) {
                    navigation.navigate("EditProfile");
                  } else {
                    navigation.navigate("Wallet", {
                      datee: new Date().getTime(),
                    });
                  }
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Wallet}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[18][selectedLanguages]}
                //  "Support"
                labelStyle={styles.labelStyle}
                onPress={() => checkkey()}
                icon={({ color, size }) => (
                  <Image
                    source={Support}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "black",
                  borderBottomWidth: 0.5,
                }}
                label={translation[67][selectedLanguages]}
                // "Contact Us"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  navigation.navigate("Contactus");
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Home}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                style={{
                  marginTop: -5,
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                }}
                label={translation[19][selectedLanguages]}
                //  "Terms & Conditions"
                labelStyle={styles.labelStyle}
                onPress={() => {
                  if (user.is_first_registered == 0) {
                    navigation.navigate("EditProfile");
                  } else {
                    navigation.navigate("TermsCondition");
                  }
                }}
                icon={({ color, size }) => (
                  <Image
                    source={Terms}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />

              <DrawerItem
                label={translation[20][selectedLanguages]}
                // label={isLoggedIn ? "Logout" : "Logout"}
                labelStyle={styles.labelStyle}
                onPress={() => logouthandle()}
                icon={({ color, size }) => (
                  <Image
                    source={Logout1}
                    resizeMode="contain"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                )}
              />
            </View>
            <View style={{ marginLeft: 15, marginTop: 20 }}>
              <SelectDropdown
                data={SelectLang}
                onSelect={(selectedItem, index) => {
                  selectlanghandle(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText={selectedLanguages}
                buttonStyle={{
                  borderRadius: 12,
                  height: 35,
                  width: 120,
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        )}
      </DrawerContentScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  console.log("drawer languge data is", selectedLanguages);
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  logoutSuccess,
  getlanguage,
  selectedlanguage,
})(DrawerContent);
const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    color: "black",
    fontFamily: fonts.PoppinsMedium,
    right: 10,
  },
});
