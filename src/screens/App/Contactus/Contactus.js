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
  Button,
} from "react-native";
import axios from "axios";
import Button1 from "../../../components/GradientButton";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
//logo
import { Persons, addphoto, contactus } from "../../../assets";

import { GradientButton } from "../../../components/GradientButton";
import { GradientsigninButton } from "../../../components/GradientButton";
import { GradientfbButton } from "../../../components/GradientButton";
import { GradientGoogleButton } from "../../../components/GradientButton";
import Headers1 from "../../../components/Headers1";

//redux
import {
  signin,
  signupwithfb,
  contactusapi,
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";
// import ChooseCode from '../../../components/ChooseCode';
// import countrypicker from '../../../components/countrypicker';
import fonts from "../../../theme/fonts";
import SelectDropdown from "react-native-select-dropdown";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");

const Contactus = ({
  signin,
  route,
  signupwithfb,
  contactusapi,
  user,
  translation,
  selectedLanguages,
}) => {
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [feedback, setfeedback] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [msg, setMsg] = useState("");

  console.log("users", user);
  const sendfeedback = async (id) => {
    if (!name) {
      setShowAlert(true);
      setMsg(translation[136][selectedLanguages]);
      // setMsg("Please enter your name")
    } else if (!email) {
      setShowAlert(true);
      setMsg(translation[223][selectedLanguages]);
      // setMsg("Please enter your email")
    } else if (!feedback) {
      setShowAlert(true);
      setMsg(translation[148][selectedLanguages]);
      // setMsg("Please enter your feedback")
    } else {
      const formData = new FormData();

      formData.append("u_id", user.u_id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("feedback", feedback);

      console.log(formData);

      const res = await contactusapi(formData);

      if (res.data.status == true) {
        // alert(res.data.message);
        // console.log("data wasss", res.data.status)
        setShowAlert1(true);
        setMsg(res.data.message);
      } else {
      }

      setname("");
      setemail("");
      setfeedback("");
    }
  };

  const okpress = async () => {
    setShowAlert1(false);
    navigation.navigate("Map");
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title={translation[67][selectedLanguages].trim()}
        //  title="Contact us"
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Image
          source={contactus}
          style={{
            height: 170,
            width: 280,
            borderRadius: 10,
          }}
        />
        {showAlert && (
          <AlertModal
            heading={msg}
            button1={translation[185][selectedLanguages]}
            // button1="OK"
            form="abc"
            onOkPress={() => {
              setShowAlert(false);
            }}
          />
        )}
        {showAlert1 && (
          <AlertModal
            heading={msg}
            button1={translation[185][selectedLanguages]}
            // button1="OK"
            form="abc"
            onOkPress={okpress}
          />
        )}
      </View>

      <View
        style={{
          justifyContent: "center",
          flex: 1,
          marginTop: "20%",
          paddingHorizontal: 30,
        }}
      >
        <TextInput
          style={{ height: 40, backgroundColor: "white", marginTop: 10 }}
          placeholder={translation[68][selectedLanguages]}
          // "Your name"
          onChangeText={(name) => setname(name)}
          value={name}
          size={20}
          selectionColor={colors.gray}
          theme={{
            colors: { primary: colors.gray },
          }}
        />
        <TextInput
          style={{ height: 40, backgroundColor: "white", marginTop: 20 }}
          placeholder={translation[69][selectedLanguages]}
          // "Email"
          selectionColor={colors.gray}
          onChangeText={(name) => setemail(name)}
          value={email}
          size={20}
          theme={{
            colors: { primary: colors.gray },
          }}
        />
        <TextInput
          style={{ height: 40, backgroundColor: "white", marginTop: 20 }}
          placeholder={translation[70][selectedLanguages]}
          // "Feedback"
          selectionColor={colors.gray}
          onChangeText={(name) => setfeedback(name)}
          value={feedback}
          size={20}
          theme={{
            colors: { primary: colors.gray },
          }}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginTop: 60,
          marginBottom: 40,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => sendfeedback()}
          style={{
            backgroundColor: colors.yellow,
            borderRadius: 7,
            height: 55,
            width: "96%",
            marginLeft: 9,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.black,
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
              textAlignVertical: "center",
              marginTop: 15,
            }}
          >
            {translation[71][selectedLanguages]}
            {/* Send */}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  contactusapi,
})(Contactus);
