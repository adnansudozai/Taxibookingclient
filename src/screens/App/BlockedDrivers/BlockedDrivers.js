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
} from "react-native";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
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
import { baloon, vercium, Persons, newlogo1, lr, curve } from "../../../assets";
import { GradientButton } from "../../../components/GradientButton";
//redux
import {
  signin,
  signupwithfb,
  getBlockdriver,
  unblockdriver,
  searchdriver,
  blockdriver,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge, SearchBar } from "react-native-elements";

import fonts from "../../../theme/fonts";

import SelectDropdown from "react-native-select-dropdown";
import Headers1 from "../../../components/Headers1";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const BlockedDrivers = ({
  signin,
  route,
  signupwithfb,
  user,
  getBlockdriver,
  unblockdriver,
  searchdriver,
  blockdriver,
  selectedLanguages,
  translation,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const [showAlert1, setShowAlert1] = useState(false);

  // const [showAlertmsg, setShowAlertmsg] = useState(false);

  const [dat, setdat] = useState("");

  const [Dataa, setDataa] = useState([]);

  const [unblockid, setunblockid] = useState("");

  const [blockid, setblockid] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  console.log("block id", blockid, unblockid);

  const yespress = async (item) => {
    const fomData = new FormData();
    fomData.append("u_id", user.u_id);
    fomData.append("otheruser_id", blockid);
    const res = await blockdriver(fomData);
    console.log("fomData", fomData);
    if (res.data.status == true) {
      setdat(new Date().getTime());
      alert(res.data.message);
    } else {
    }
    setShowAlert1(false);
    setModalVisible(false);
  };

  const yespressunblock = async (item) => {
    console.log("data is before removing", Dataa.length);

    const fomData = new FormData();
    fomData.append("u_id", user.u_id);
    fomData.append("blocked_user_id", unblockid);
    const res = await unblockdriver(fomData);
    if (res.data.status == true) {
      if (Dataa.length == 1) {
        setDataa([]);
      }
      setShowAlert(false);
      setModalVisible(false);
      //setunblock(res.data.data)

      setdat(new Date().getTime());
      alert(res.data.message);
    } else {
      setShowAlert(false);
      setModalVisible(false);
    }
  };

  const toggleModal = () => {
    if (isModalVisible == true) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  const cancelpress = async (id) => {
    setShowAlert1(false);
  };
  const cancelpres = async (id) => {
    setShowAlert(false);
  };
  const unblockhandle = async (item) => {
    setShowAlert(true);
    setMsg(translation[291][selectedLanguages]);
    // setMsg("Are you sure you want to unblock this driver");
    setunblockid(item);
  };
  const cancelmodel = async (item) => {
    setModalVisible(false);
  };

  const blockhandle = async (item) => {
    setblockid(item);
    setShowAlert1(true);
    setMsg(translation[292][selectedLanguages]);
    // setMsg("Are you sure you want to block this driver");
  };

  useFocusEffect(
    React.useCallback(() => {
      // setLoading(true);
      (async () => {
        const fomData = new FormData();
        fomData.append("u_id", user.u_id);

        const res = await getBlockdriver(fomData);
        if (res.data.status == true) {
          setDataa(res.data.data);
        } else {
        }
      })();
    }, [dat])
  );

  const searchFilterFunction = (text) => {
    setSearch(text);
    console.log(text);
    if (parseInt(text.length) > 0) {
      // setLoading(true);
      (async () => {
        const fomData = new FormData();
        fomData.append("text", text);
        const res = await searchdriver(fomData);
        if (res.data.status == true) {
          setFilteredDataSource(res.data.data);
        } else {
        }
      })();
    } else {
      setFilteredDataSource("");
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => blockhandle(item.u_id)}>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            paddingHorizontal: 13,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 30 / 2,
            }}
          >
            <Image
              source={{
                uri: `${item.dp}`,
              }}
              resizeMode="cover"
              style={{
                height: 30,
                width: 30,
                borderRadius: 30 / 2,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
                color: "black",
                marginTop: 2,
                marginLeft: 20,
                textAlign: "center",
              }}
            >
              {item.phone_no}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const Item = ({ item, index }) => {
    return (
      <View
        style={{
          marginTop: "7%",
          marginBottom: 10,
          flex: 0.5,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 180,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },

            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 3,
          }}
        >
          <Text style={{ marginLeft: 70, marginBottom: 10 }}>
            {item.car_Registration_no}
          </Text>

          <Image
            source={{
              uri: `${item.dp}`,
            }}
            resizeMode="cover"
            style={{
              height: 70,
              width: 70,
              borderRadius: 70 / 2,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {item.name}
          </Text>
          <TouchableOpacity
            style={{
              shiftDistanceX: 3.0,
              shiftDistanceY: 3.0,

              pressDuration: 0.0,
              pressDelay: 0.0,
            }}
            onPress={() => unblockhandle(item.u_id)}
          >
            <Text
              style={{
                fontSize: 13,
                color: colors.yellow,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {/* Unblock */}
              {translation[56][selectedLanguages]}{" "}
            </Text>
          </TouchableOpacity>
        </View>
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
        title={translation[105][selectedLanguages].trim()}
        // title='Blocked drivers'
      />

      <View style={{ flex: 1 }}>
        {/* <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item}/> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: "10%",
          }}
        >
          {showAlert1 && (
            <AlertModal
              heading={msg}
              button1={translation[185][selectedLanguages]}
              // button1="OK"
              button2={translation[99][selectedLanguages]}
              // button2="Cancel"
              onYesPress={yespress}
              onNoPress={cancelpress}
            />
          )}

          {showAlert && (
            <AlertModal
              heading={msg}
              button1={translation[185][selectedLanguages]}
              // button1="OK"
              button2={translation[99][selectedLanguages]}
              // button2="Cancel"
              onYesPress={yespressunblock}
              onNoPress={cancelpres}
              onOkPress={() => {
                setShowAlert(false);
              }}
            />
          )}
        </View>

        <FlatList
          data={Dataa}
          renderItem={Item}
          keyExtractor={(item) => item}
          numColumns={2}
        />
      </View>
      <View style={{}}>
        <GradientButton
          title={translation[104][selectedLanguages].trim()}
          // title='Add driver'
          onButtonPress={() => {
            toggleModal();
          }}
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: "#FBFBFB",
            borderRadius: 7,
            borderWidth: 1,
            height: "100%",
            width: "100%",
            flex: Platform.OS == "android" ? 1 : 1,
          }}
        >
          <Entypo
            name="cross"
            color={colors.yellow}
            size={22}
            onPress={cancelmodel}
            style={{
              alignItems: "flex-end",
              alignSelf: "flex-end",
              padding: 10,
            }}
          />
          <SearchBar
            round
            cancelIcon={false}
            showCancel={false}
            searchIcon={null}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            placeholder={translation[146][selectedLanguages].trim()}
            // 'Enter Phone Number'
            value={search}
            inputStyle={{
              backgroundColor: "white",
            }}
            leftIconContainerStyle={{
              backgroundColor: "white",
            }}
            containerStyle={{
              backgroundColor: "white",
              borderTopColor: "white",
            }}
            inputContainerStyle={{
              backgroundColor: "white",
            }}
          />
          <FlatList
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
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
});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;

  return {
    user,
    selectedLanguages,
    translation,
  };
};

export default connect(mapStateToProps, {
  getBlockdriver,
  unblockdriver,
  searchdriver,
  blockdriver,
})(BlockedDrivers);
