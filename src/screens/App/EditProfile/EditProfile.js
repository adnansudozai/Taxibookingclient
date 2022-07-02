import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { CommonActions } from "@react-navigation/routers";
import colors from "../../../theme/colors";
import { TextInput, TextInputMask, Checkbox } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GradientButton } from "../../../components/GradientButton";
import Headers1 from "../../../components/Headers1";
import { updateProfile } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import { useNavigation } from "@react-navigation/native";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
const ImagePicker = require("react-native-image-picker");
const EditProfile = ({
  updateProfile,
  selectedLanguages,
  translation,
  user,
}) => {
  const navigation = useNavigation();
  const [profilePath, setFilePath] = useState("");
  const [namee, setName] = useState(user != null ? user.name : "");
  const [email, setemail] = useState(user != null ? user.email : "");
  const [loading, setloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState();

  // profilePath == "" ? user.dp : profilePath
  const chooseFile = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
      }
    });
  };

  const updatePro = async (id) => {
    if (!namee) {
      setMsg(translation[124][selectedLanguages]);
      // setMsg("Kindly Enter Your Name");
      setShowAlert(true);
    } else if (!email) {
      setMsg(translation[125][selectedLanguages]);
      // setMsg("Kindly Enter Your Email");
      setShowAlert(true);
    } else {
      setloading(true);
      const formData = new FormData();

      if (profilePath != "") {
        formData.append("name", namee);
        formData.append("email", email);
        formData.append("u_id", user.u_id);
        formData.append("dp", {
          uri: profilePath.uri,
          name: profilePath.fileName,
          type: profilePath.type,
        });
      } else {
        formData.append("name", namee);
        formData.append("email", email);
        formData.append("u_id", user.u_id);
        // navigation.navigate("Map");
      }

      const res = await updateProfile(formData);

      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
        setloading(false);
        navigation.navigate("Map");
        // setShowAlert(true);
      } else {
        setloading(false);
      }
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Headers1
        title={translation[109][selectedLanguages].trim()}
        // "Edit Profile"
      />
      <Loading visible={loading} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margintop: 18,
        }}
      >
        {user != null && (
          <TouchableOpacity onPress={chooseFile}>
            {profilePath == "" && (
              <Image
                source={{ uri: user.dp }}
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 90 / 2,
                }}
              />
            )}
            {profilePath != "" && (
              <Image
                source={profilePath}
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 90 / 2,
                }}
              />
            )}
          </TouchableOpacity>
        )}
        <View style={{ position: "absolute", bottom: -8, left: 220 }}>
          <FontAwesome name="camera" color={colors.yellow} size={30} />
        </View>
      </View>

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
          placeholder={translation[106][selectedLanguages]}
          // "Name"
          selectionColor={colors.primary}
          onChangeText={(name) => setName(name)}
          value={namee}
          theme={{
            colors: { primary: colors.primary },
          }}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
        <TextInput
          style={{ height: 50, backgroundColor: "white" }}
          placeholder={translation[69][selectedLanguages]}
          // "Email"
          selectionColor={colors.primary}
          value={email}
          onChangeText={(email) => setemail(email)}
          theme={{
            colors: { primary: colors.primary },
          }}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
      </View>
      <View style={{ flex: 1, marginTop: 70, paddingHorizontal: 15 }}>
        <GradientButton
          title={translation[108][selectedLanguages]}
          // "Update"
          onButtonPress={() => {
            updatePro();
            // navigation.navigate("ListDriver");
            // handleLogin();
          }}
        />
      </View>
      {showAlert == true && (
        <AlertModal
          button1={translation[185][selectedLanguages]}
          // button1="OK"
          form={"OK"}
          heading={msg}
          onOkPress={() => {
            setShowAlert(false);
          }}
        />
      )}
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
  updateProfile,
})(EditProfile);
