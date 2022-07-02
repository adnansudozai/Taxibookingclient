import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  Keyboard,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import { Loading } from "../../../components/Loading";
import Headers1 from "../../../components/Headers1";
import colors from "../../../theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
//redux
import database from "@react-native-firebase/database";

import { signin, signupwithfb } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScaleFromCenterAndroidSpec } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");

const Support = ({ signin, selectedLanguages, user, translation, route }) => {
  const DATA = [
    {
      smesage: " Lorem ipsum dolor sit amet",
      sdate: "2 day ago",
      rmesage:
        "   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry,s standard dummy text ever since the 1500s,",
      rdate: "2 day ago",
    },
  ];
  const { dname } = route.params;

  const { messagekey } = route.params;
  const { receiverid } = route.params;
  const { roomkey } = route.params;

  const messagesRef = database().ref(messagekey);

  const roomRef = database().ref(roomkey);

  const [senderid, setsenderid] = useState(user.u_id);

  //  const [receiverid, setreceiverid] = useState(dname=='Support'?0:uid);

  const [message, setmessage] = useState("");
  const [messageshow, setmessageshow] = useState([]);

  const [indexid, setindexid] = useState("");

  const [mref, setmref] = useState("");

  const [loading, setloading] = useState(true);

  const scrollViewRef = useRef();
  let message1 = translation[214][selectedLanguages];
  // "Hello there! i am online"
  let message2 = translation[215][selectedLanguages];
  // "I am back now"
  let message3 = translation[216][selectedLanguages];
  // "Something needs to update. Let me have a look"

  //const messagesRef = database().ref(`messages/-MxnKpvzOi87EzEC9LZv`);

  // messagesRef.on('value', snapshot => {
  // });

  //chating code starts here

  const addmessage = async (item) => {
    if (message == "") {
    } else {
      setmessage("");
      try {
        await messagesRef.push({
          send_uid: senderid,
          recv_uid: receiverid,
          content: message,
          created_at: new Date().getTime(),
        });
        await roomRef.update({
          who_send: senderid,
          content: message,
          created_at: new Date().getTime(),
          sender_dp: user.dp,
          is_read: "no",
        });
      } catch (err) {
        alert(err);
      }
      //Keyboard.dismiss()
    }
  };
  const fixmessage = async (item) => {
    try {
      await messagesRef.push({
        send_uid: senderid,
        recv_uid: receiverid,
        content: item,
        created_at: new Date().getTime(),
      });
      await roomRef.update({
        who_send: senderid,
        content: item,
        created_at: new Date().getTime(),
        sender_dp: user.dp,
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    messagesRef.on("value", (snapshot) => {
      let messageFB = [];
      snapshot.forEach((element) => {
        messageFB.push({
          send_uid: element.val().send_uid,
          recv_uid: element.val().recv_uid,
          created_at: element.val().created_at,
          content: element.val().content,
        });
      });

      setmessageshow(messageFB);
      setloading(false);
    });
  }, [messagekey, receiverid, dname, roomkey]);

  //chatiing code ends here

  const renderItem = ({ item, index }) => {
    let widthitem = "70%";
    let ago = "";

    let time = new Date().getTime();
    let time2 = time - item.created_at;
    let second = time2 / 1000;
    if (second < 60) {
      ago = translation[217][selectedLanguages];
      // "just now"
    } else if (second > 60 && second < 3600) {
      let minute = second / 60;
      var result = Math.floor(minute);
      ago = [
        `${result} `,
        translation[218][selectedLanguages],
        // minute ago
      ];
    } else if (second > 3600 && second < 86400) {
      let minute = second / 60;
      let hour = minute / 60;
      var result = Math.floor(hour);
      ago = [
        `${result} `,
        translation[219][selectedLanguages],
        // hour ago
      ];
    } else if (second > 86400 && second < 2629745) {
      let minute = second / 60;
      let hour = minute / 60;
      let day = hour / 24;
      var result = Math.floor(day);
      ago = [
        `${result} `,
        translation[220][selectedLanguages],
        // day ago
      ];
    } else if (second > 2592000 && second < 31556964) {
      let minute = second / 60;
      let hour = minute / 60;
      let day = hour / 24;
      let month = day / 30;
      var result = Math.floor(month);
      ago = [
        `${result} `,
        translation[221][selectedLanguages],
        //  month ago
      ];
    } else if (second > 31556964) {
      let minute = second / 60;
      let hour = minute / 60;
      let day = hour / 24;
      let month = day / 30;
      let year = month / 365;
      var result = Math.floor(year);
      ago = [
        `${result} `,
        translation[222][selectedLanguages],
        // year ago
      ];
    }

    return (
      <View
        style={{
          flex: 1,

          paddingHorizontal: 15,
          borderWidth: 0,
          height: "100%",
        }}
      >
        {item.send_uid != user.u_id ? (
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              marginTop: "0%",
            }}
          >
            <View
              style={{
                borderWidth: 0,
                width: widthitem,
                backgroundColor: "#E3E3E3",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 1,
                borderRadius: 17,
                padding: 6,
                marginBottom: 1,
                paddingLeft: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "black" }}>
                {" "}
                {item.content}{" "}
              </Text>
            </View>
            <View
              style={{
                paddingRight: 3,
                borderWidth: 0,
                marginTop: 2,
                paddingBottom: 3,
                paddingLeft: "4%",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: "1.5%",
                }}
              >
                {ago}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              marginTop: "0%",
            }}
          >
            <View
              style={{
                width: widthitem,
                backgroundColor: "#11B5DE",
                justifyContent: "center",
                alignItems: "flex-start",
                borderRadius: 15,
                padding: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                {item.content}
              </Text>
            </View>
            <View
              style={{
                paddingRight: 3,
                borderWidth: 0,
                marginTop: 2,
                paddingBottom: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: "1.5%",
                }}
              >
                {ago}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        borderWidth: 0,
        paddingLeft: 8,
      }}
    >
      <Headers1
        // title= {dname}
        // "Support"
        title={translation[18][selectedLanguages]}
        screen={"false"}
      />

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        style={{
          flex: 0.2,
          backgroundColor: "white",
          borderWidth: 0,
          marginTop: "10%",
        }}
      >
        {messageshow != "" ? (
          <FlatList
            data={messageshow}
            renderItem={renderItem}
            keyExtractor={(item) => item.index}
          />
        ) : (
          <View
            style={{ marginHorizontal: 10, marginTop: 660, paddingBottom: 15 }}
          >
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => fixmessage(message1)}
                style={{
                  marginLeft: 0,
                  borderRadius: 30,
                  height: 30,
                  padding: 5,
                  width: "100%",
                  backgroundColor: "#E4DEDE",
                  borderWidth: 0,
                  color: "black",
                  shadowOpacity: 1.5,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 0,
                    width: 1,
                  },
                  elevation: 1,
                }}
              >
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {" "}
                  {message1}{" "}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => fixmessage(message2)}
                style={{
                  marginLeft: 10,
                  borderRadius: 20,
                  height: 30,

                  padding: 5,
                  width: "100%",
                  backgroundColor: "#E4DEDE",
                  borderWidth: 0,
                  color: "black",

                  shadowOpacity: 1.5,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 0,
                    width: 1,
                  },
                  elevation: 1,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  {message2}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => fixmessage(message3)}
              style={{
                marginLeft: 10,
                borderRadius: 20,
                height: 30,

                padding: 5,
                width: "82%",
                backgroundColor: "#E4DEDE",
                borderWidth: 0,
                color: "black",
                justifyContent: "center",

                shadowOpacity: 1.5,
                shadowRadius: 2,
                shadowOffset: {
                  height: 0,
                  width: 1,
                },
                elevation: 1,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {message3}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          borderWidth: 0,
          flexDirection: "row",
          paddingTop: 0,
          paddingBottom: 10,
          paddingLeft: 4,
          width: "100%",
          paddingLeft: 10,
        }}
      >
        <TextInput
          multiline={true}
          style={{
            shadowColor: colors.darkgray,
            borderRadius: 40,
            height: 60,
            width: "86%",
            backgroundColor: "white",
            borderWidth: 0,
            color: "black",
            paddingLeft: 15,

            shadowOpacity: 1.5,
            shadowRadius: 2,
            shadowOffset: {
              height: 0,
              width: 1,
            },
            elevation: 1.5,
          }}
          value={message}
          placeholder={translation[147][selectedLanguages].trim()}
          // "Write some thing"
          placeholderTextColor={colors.darkBlack}
          underlineColor="transparent"
          onChangeText={(val) => setmessage(val)}
        />

        <Ionicons
          name={"send-sharp"}
          size={35}
          color={colors.yellow}
          onPress={() => addmessage()}
          style={{
            paddingLeft: 8,
            alignSelf: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {})(Support);
