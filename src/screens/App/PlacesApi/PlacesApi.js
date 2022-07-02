import React, { useState, useEffect, useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Button,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { Input } from "react-native-elements";
import { arrowleft, cross } from "../../../assets";
import colors from "../../../theme/colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Loading } from "../../../components/Loading";
import fonts from "../../../theme/fonts";

import {
  signin,
  signupwithfb,
  getMylocations,
  addfavlocation,
  DeleteLocation,
} from "../../../redux/actions/auth";
import { add } from "react-native-reanimated";
import { Avatar } from "react-native-paper";
var screenWidth = Dimensions.get("window").width;
import AlertModal from "../../../components/AlertModal";

///////////////////marker pointing////////////
const PlacesApi = ({
  signin,
  route,
  signupwithfb,
  getMylocations,
  addfavlocation,
  DeleteLocation,
  user,
  selectedLanguages,
  translation,
}) => {
  const navigation = useNavigation();
  const ref = useRef(null);

  const status = route.params.stat;
  const screen = route.params.screen;
  const datee = route.params.datee;

  // const [languagecode, setlanguagecode] = useState(user!=null?user.language_code:'en');

  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [msg, setMsg] = useState("");

  const [dat, setdat] = useState("");

  // if(screen=='MyLocation')
  // {
  //   status==undefined;
  // }

  const [showaddress, setshowaddress] = useState("");
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [marker, setmarker] = useState("");
  const [markerLatitude, setmarkerLatitude] = useState("");
  const [mylocation, setmylocation] = useState([]);
  const [loading, setloading] = useState(false);

  const onPress = (data, details) => {
    setshowaddress(data.description);

    setCurrentLatitude(details.geometry.location.lat);
    setCurrentLongitude(details.geometry.location.lng);
    let a = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    changeregion(a, 1);
  };
  const lat = 33.684422;
  const lng = 73.047882;

  const [region, setRegion] = useState({
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  ////////////////////////////
  useFocusEffect(
    React.useCallback(() => {
      Geolocation.getCurrentPosition((position) => {
        // if (currentLatitude == "" && currentLongitude == "") {
        const currentLongitude = JSON.stringify(position.coords.longitude);

        const currentLatitude = JSON.stringify(position.coords.latitude);

        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);

        let a = {
          latitude: parseFloat(currentLatitude),
          longitude: parseFloat(currentLongitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        changeregion(a, 2);
        // }
      });
    }, [])
  );

  // useEffect(() => {}, [newRegion]);

  const changeregion = (region1, ishow) => {
    if (ishow == 2) {
      geocoding(region1);
    }

    setRegion(region1);
    // setnewRegion(region);
  };

  const geocoding = (region1) => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        region1.latitude +
        "," +
        region1.longitude +
        "&key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setCurrentLatitude(region1.latitude);
        setCurrentLongitude(region1.longitude);

        console.log("consolepower", responseJson.results[0].formatted_address);
        setshowaddress(
          JSON.stringify(responseJson.results[0].formatted_address)
        );

        ref.current?.setAddressText(
          responseJson.results[0].formatted_address.replace(/['"]+/g, "")
        );
      });
  };

  const Clear = (sg) => {
    ref.current?.setAddressText("");
  };

  const refRBSheet = useRef();
  useEffect(() => {
    setloading(true);
    (async () => {
      const fomData = new FormData();
      fomData.append("u_id", user.u_id);
      const res = await getMylocations(fomData);

      if (res.data.status == true) {
        setmylocation(res.data.data);
        setdat(new Date().getTime());

        setloading(false);
      } else {
        setmylocation([]);
        setloading(false);
      }
    })();
    setloading(false);
  }, [datee]);
  //dat, datee
  /////// Add favorite location
  const [favoriteloc, setfavoriteloc] = useState();
  const [placename, setplacename] = useState("");
  const SubmitAddress = () => {
    // useEffect(() => {
    // setLoading(true);
    (async () => {
      const frmData = new FormData();
      frmData.append("u_id", user.u_id);
      frmData.append("name", placename);
      frmData.append("location_lat", currentLatitude);
      frmData.append("location_long", currentLongitude);
      frmData.append("location_address", showaddress);

      const res = await addfavlocation(frmData);
      if (res.data.status == true) {
        setfavoriteloc(res.data);
        setShowAlert(true);
        setShowAlert1(false);
        setMsg(res.data.message);
        // Location added successfully
      } else {
        setShowAlert(true);
        setShowAlert1(false);
        setMsg(res.data.message);
      }
    })();

    // }, []);
  };

  const okpress = async () => {
    setShowAlert(false);
    navigation.navigate("MyLocation", { datee: new Date().getTime() });
  };

  //////////////////////////

  const goBackData = (data, details) => {
    if (status == true && screen == "Map") {
      navigation.navigate("Map", {
        addres: showaddress.replace(/['"]+/g, ""),
        Latitude: currentLatitude,
        Longitude: currentLongitude,
        status: status,
      });
      setshowaddress("");
    } else if (status == false && screen == "Map") {
      navigation.navigate("Map", {
        addres1: showaddress.replace(/['"]+/g, ""),
        Latitude1: currentLatitude,
        Longitude1: currentLongitude,
        status: status,
      });
      setshowaddress("");
    } else if (screen == "MyLocation") {
      navigation.navigate("MyLocation", {
        addres: showaddress.replace(/['"]+/g, ""),
        Latitude: currentLatitude,
        Longitude: currentLongitude,
      });
    }
  };

  const favaddres = (id) => {
    refRBSheet.current.close();
    if (status == true) {
      navigation.navigate("Map", {
        addres: id.location_address,
        Latitude: id.location_lat,
        Longitude: id.location_long,
        status: status,
      });
      refRBSheet.current.close();
    } else if (status == false) {
      navigation.navigate("Map", {
        addres1: id.location_address,
        Latitude1: id.location_lat,
        Longitude1: id.location_long,
        status: status,
      });
      refRBSheet.current.close();
    }
  };

  const rbsopen = () => {
    refRBSheet.current.open();
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => favaddres(item)}>
        <View style={{ paddingTop: 10 }}>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
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
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  console.log("CurrentLatitude", currentLatitude + "," + currentLongitude);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={(region) => changeregion(region, 2)}
      >
        <Marker
          draggable
          coordinate={region}
          onDragEnd={(e) => {
            setCurrentLatitude(e.nativeEvent.coordinate.latitude);
            setCurrentLongitude(e.nativeEvent.coordinate.longitude);
          }}
        />
      </MapView>

      <View
        style={{
          position: "absolute",
          width: "100%",
          paddingTop: 10,
          flex: 1,
        }}
      >
        {user != null && (
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={translation[247][selectedLanguages]}
            // 'Search'
            minLength={2}
            fetchDetails={true}
            returnKeyType={"search"}
            // debounce={400}
            onChangeText={(a) => {}}
            textInputProps={{
              placeholderTextColor: "black",
              color: "black",
            }}
            query={{
              key: "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0",
              language: user.language_code,
              // components: "country:bg",
            }}
            GooglePlacesDetailsQuery={{
              fields: "geometry",
            }}
            onPress={onPress}
            onFail={(error) => console.error(error)}
            renderLeftButton={() => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                  color: "black",
                }}
              >
                <Image
                  source={arrowleft}
                  resizeMode="contain"
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: "black",
                  }}
                />
              </TouchableOpacity>
            )}
            renderRightButton={() => (
              <TouchableOpacity
                onPress={() => {
                  Clear();
                }}
              >
                <FontAwesome
                  name="remove"
                  size={24}
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
            )}
            styles={{
              textInputContainer: {
                marginVertical: "10%",
                borderTopWidth: 0,
                marginHorizontal: 10,
                color: "black",
              },
            }}
          />
        )}
        {showAlert && (
          <AlertModal
            heading={msg}
            button1={translation[185][selectedLanguages]}
            // button1="OK"
            form="abc"
            onOkPress={okpress}
          />
        )}
      </View>

      {screen == "MyLocation" && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            bottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowAlert1(!showAlert1)}
            activeOpacity={0.7}
            style={{
              width: "80%",
              height: 40,
              backgroundColor: colors.yellow,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {translation[115][selectedLanguages]}
              {/* Submit */}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal animationType="slide" transparent={true} isVisible={showAlert1}>
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
                setShowAlert1(false);
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
              placeholderTextColor="red"
              color="black"
            />
          </View>

          <TouchableOpacity
            onPress={() => SubmitAddress()}
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
      {screen == "Map" && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            bottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => goBackData()}
            activeOpacity={0.7}
            style={{
              width: "80%",
              height: 40,
              backgroundColor: colors.yellow,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {/* Select and go back */}
              {translation[154][selectedLanguages].trim()}
            </Text>
          </TouchableOpacity>

          {mylocation.length != [] && (
            <TouchableOpacity
              onPress={() => rbsopen()}
              activeOpacity={0.7}
              style={{
                width: "80%",
                height: 40,
                marginTop: 10,
                backgroundColor: "#3B3435",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                {/* Favorite Locations */}
                {translation[155][selectedLanguages].trim()}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <Loading visible={loading} />
        <FlatList
          data={mylocation}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
  },
});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {
  getMylocations,
  addfavlocation,
})(PlacesApi);

///////////////////////////////////old secreen//////////////////////////////////////////////
