import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { CommonActions } from "@react-navigation/routers";
import colors from "../../../theme/colors";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getMylocations, DeleteLocation } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import fonts from "../../../theme/fonts";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Paragraph } from "react-native-paper";
const { height: DEVICE_HEIGHT } = Dimensions.get("window");
import { Loading } from "../../../components/Loading";
import AlertModal from "../../../components/AlertModal";

const MyLocation = ({
  signin,
  route,
  signupwithfb,
  getMylocations,
  DeleteLocation,
  user,
  translation,
  selectedLanguages,
}) => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [test, settest] = useState("");
  const data = route.params;
  const datee = route.params;

  const [mylocation, setmylocation] = useState([]);
  const [dat, setdat] = useState("");

  const myroute = useRoute();

  console.log("mynavigation1====>", myroute);

  useFocusEffect(
    React.useCallback(() => {
      setloading(true);
      (async () => {
        const fomData = new FormData();
        fomData.append("u_id", user.u_id);
        const res = await getMylocations(fomData);

        if (res.data.status == true) {
          setdat(new Date().getTime());
          setmylocation(res.data.data);
          setloading(false);
        } else {
          setloading(false);
        }
        setloading(false);
      })();
    }, [test])
  );

  const [delid, setdelid] = useState();

  const locationdel = async (id) => {
    setdelid(id);
    setShowAlert(true);
  };

  const deletelocation = async () => {
    setloading(true);
    const fomData = new FormData();
    fomData.append("u_id", user.u_id);
    fomData.append("location_id", delid);
    const res = await DeleteLocation(fomData);
    console.log("myres", res);
    if (res.data.status == true) {
      setmylocation(res.data.data);
      settest(Math.random());
      // if (mylocation.length == 1) {
      //   setmylocation([]);
      //   setloading(false);
      // } else {
      //   setmylocation(res.data.data);
      //   setdat(new Date().getTime());
      //   setloading(false);
      // }
      // setwithdrawdata(res.data.data)
      // alert(res.data.message);
      setShowAlert(false);
      setloading(false);
    } else {
      setmylocation(res.data.data);
      setloading(false);
    }
  };

  const cancelpress = async (id) => {
    setShowAlert(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <View style={{ width: "10%" }}>
          <Foundation name="marker" color={"red"} size={24} />
        </View>
        <View style={{ width: "85%" }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: fonts.PoppinsMedium,
              color: "black",
            }}
          >
            {item.location_name}
          </Text>
        </View>

        <View style={{ width: "10%", marginTop: -10 }}>
          <TouchableOpacity onPress={() => locationdel(item.location_id)}>
            <Entypo name="cross" color={"red"} size={24} />
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
            <Ionicons
              name={"chevron-back"}
              size={24}
              color={colors.secondary}
              onPress={() => {
                navigation.navigate("Map");
              }}
              style={{ paddingTop: 4 }}
            />
            <View>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 6,
                  fontWeight: "bold",
                  color: colors.black,
                }}
              >
                {translation[151][selectedLanguages].trim()}
                {/* Addresses */}
              </Text>
            </View>
          </View>
        }
      />

      <Loading visible={loading} />
      {showAlert && (
        <AlertModal
          heading={translation[152][selectedLanguages]}
          // "Are you sure to remove your favorite location ?"
          button1={translation[176][selectedLanguages]}
          // button1="Yes"
          button2={translation[175][selectedLanguages]}
          // button2="No"

          onYesPress={() => deletelocation()}
          onNoPress={cancelpress}
        />
      )}

      <FlatList
        data={mylocation}
        renderItem={renderItem}
        keyExtractor={(item) => item.location_id}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PlacesApi", { screen: "MyLocation" })
        }
        style={{
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.yellow,
          marginHorizontal: 20,
          borderRadius: 5,
          marginBottom: 50,
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: fonts.PoppinsBold }}>
          {translation[121][selectedLanguages]}
          {/* Add address */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  getMylocations,
  DeleteLocation,
})(MyLocation);
