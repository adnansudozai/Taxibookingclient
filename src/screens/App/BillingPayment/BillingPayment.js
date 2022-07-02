// /** @format */

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
  PermissionsAndroid,
  TextInput
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import CustomText from "../../../components/Text";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, InputPhone } from "../../../components/Input/Input";
import { CommonActions } from "@react-navigation/routers";

import colors from "../../../theme/colors";
import { TextInputMask, Checkbox } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
//logo
import {
  location,
  currentlocation,
  carmove,
  Persons,
  message,
  caricon,
} from "../../../assets";
import { GradientButton } from "../../../components/GradientButton";
//redux
import {
  signin,
  signupwithfb,
  billingProcess,
  paypayment,
  paypaymentride,
  addammountfortrip
} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import AlertModal from "../../../components/AlertModal";
import { Loading } from "../../../components/Loading";
import AsyncStorage from "@react-native-community/async-storage";

import { Header, Badge } from "react-native-elements";

import fonts from "../../../theme/fonts";

import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import PolylineDirection from "react-native-maps/polyline-direction";
import PolylineDirection from "@react-native-maps/polyline-direction";
import Geolocation from "@react-native-community/geolocation";

import SelectDropdown from "react-native-select-dropdown";
import  Headers1  from "../../../components/Headers1";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from './keys';
import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import { useNavigation } from "@react-navigation/native";

const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";

// create a component
const CURRENCY = 'USD';
var CARD_TOKEN = null;

const BillingPayment = ({ signin, route, signupwithfb,user,paypayment,addammountfortrip,selectedLanguages,translation }) => {
  const navigation = useNavigation();
  const [namee, setName] = useState("");
  // const {payment}=route.params;
  const {screen}=route.params;
  const {tripid}=route.params;

  let {payment}=route.params;

    console.log('withdraw data',tripid)
  const [CardInput, setCardInput] = useState('')
let val=CardInput.slice(CardInput.length - 4)
  const [cardnumber, setcardnumber] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [msg, setMsg] = useState("");
  const [cvc, setcvc] = useState("");
  const [loading, setloading] = useState(false);
  
  const [expiratoinDate, setExpirationDate] = useState('');
  const [backspaceFlag, setBackspaceFlag] = useState(false);
console.log('screen is ',screen)
  const handleExpirationDate = (text) => {
if(backspaceFlag===false){
    if(text.length==2){
   setExpirationDate(text+"/");
   setBackspaceFlag(true)
    }
  
    else{
      setExpirationDate(text)
    }
}
else{
  if(text.length==2){
    let text2=expiratoinDate.slice(0,1)
  
    setExpirationDate(text2);
    setBackspaceFlag(false)
     }
   
     else{
       setExpirationDate(text)
  
     }


}
 
        };

let datetime=expiratoinDate.split('/');

// / ///////////////////////api if payment success///////////////////////////


  
const paymentsucces = async id => {

  if(screen=='Map'){

        
    const formData = new FormData();
    formData.append('trip_id', tripid);
    formData.append('amount',payment );
    formData.append('amount_to_pay', payment);
         formData.append('u_id', user.u_id);
     formData.append('status','CC');   
      formData.append('lastdigits', val);

    const res = await addammountfortrip(formData);
    console.log("ammount to pay is",res,formData)
    if (res.data.status == true) {
      setloading(false)
      setBackspaceFlag(false)
      navigation.navigate("Ratings", {
        Dataa: res.data,
      });
      // setMsg(res.data.message);
      // setShowAlert(true);
    
    } else {
    }

  }
else{  
    const formData = new FormData();
     formData.append('name', namee);
    
      formData.append('amount',payment );
     
       formData.append('cvv', val);
    formData.append('userid', user.u_id);
       const res = await paypayment(formData);
    console.log('formdata payment',formData,res)
    if (res.data.status == true) {
      setloading(false)
      navigation.navigate('Success',{
        screen:'payment'
      })
      setBackspaceFlag(false)
     // setShowAlert(true);
    } else {
    }


}
setName('')
setCardInput('')
setcvc('')
setExpirationDate('')

};



//////////////////////strip api functions////////////////////////

function getCreditCardToken(creditCardData){

  const card = {
    'card[number]': CardInput, //creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': datetime[0], //creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': datetime[1]  ,//creditCardData.values.expiry.split('/')[1],
    'card[cvc]': cvc  ,      //creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).
  then(response => response.json())
  .catch((error)=>console.log(error))
};
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
 function subscribeUser(creditCardToken){
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};
 
// /////////////////////////////////////////////////////////////////





const process = async () => {

  if(!namee){
    setShowAlert1(true)
   setMsg(translation[136][selectedLanguages])
  //  setMsg('Please enter your name')
  }
  

 else  if(!CardInput){
  setShowAlert1(true)
 setMsg(translation[137][selectedLanguages])
//  setMsg('Please enter your card number')
}
 else  if(!cvc){
   setShowAlert1(true)
  setMsg(translation[138][selectedLanguages])
  // setMsg('Please enter 3 digit cvc')
 }
 else  if(!expiratoinDate){
  setShowAlert1(true)
//  setMsg('Please enter expire date')
 setMsg(translation[139][selectedLanguages])
}

 else{
   
  setloading(true)
  let creditCardToken;
  try {
    // Create a credit card token
    creditCardToken = await getCreditCardToken(CardInput);
     console.log("creditCardToken", creditCardToken)
    if (creditCardToken.error) {
      alert(translation[140][selectedLanguages]);
      // creditCardToken error
      setloading(false)
      return;
    }
  } catch (e) {
    setloading(false)
    console.log("e",e);
    return;
  }
  // Send a request to your server with the received credit card token
  const { error } = await subscribeUser(creditCardToken);
  // Handle any errors from your server
  if (error) {
    setloading(false)
    alert(error)
  } else {
   
    let pament_data = await charges();
    console.log('pament_data', pament_data.status);
    if(pament_data.status == 'succeeded')
    {
      //  alert("Payment Successfully");
      paymentsucces()
      
    }
    else{
      // alert('Payment failed');
      setloading(false)
      navigation.navigate('TransactionDeclined')
      
    }
  }
}
};

const charges = async () => {

    const card = {
      'amount': payment*100, 
      'currency': CURRENCY,
      'source': CARD_TOKEN,
      'description': "Developers Sin in Subscription",
     
    };
    
    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Secret_key}`
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&')
    }).then(response => response.json());
};

  return (
    <ScrollView
    style={{
      flex: 1,
      backgroundColor: "white",
    }}
  >
    <Headers1 
    title= {translation[212][selectedLanguages]}
    //  "Billing and payment"
    screen={"false"}
     />
<Loading visible={loading} />
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <View style={{ paddingTop: 20 }}>
        <TextInput
          style={{ height: 50, backgroundColor: "white", marginTop: 10,borderBottomWidth:1,   padding: 10,marginHorizontal:10 }}
          placeholderTextColor='black'
          color='black'
          value={namee}
          placeholder= {translation[141][selectedLanguages]}
          // "Card holder name"
          selectionColor={colors.primary}
          onChangeText={(nam) => setName(nam)}
          theme={{
            colors: { primary: colors.primary },
          }}
        />
        <View style={{borderBottomWidth:1, height: 50, backgroundColor: "white", marginTop: 10,   padding:10,paddingTop:16,marginHorizontal:10 }}>
          <Text>{payment}</Text>

       
        </View>

        <TextInput
          style={{ height: 50, backgroundColor: "white", marginTop: 10,borderBottomWidth:1,   padding: 10,marginHorizontal:10 }}
          placeholder= {translation[142][selectedLanguages]}
          // "Card number-xxxx xxxxxxxxxxxxxx xx"
          value={CardInput}
          maxLength={16}
          selectionColor={colors.primary}
          onChangeText={(cardno) => setCardInput(cardno)}
          placeholderTextColor='black'
          color='black'
          keyboardType="numeric"
        />

        <TextInput
         style={{ height: 50, backgroundColor: "white", marginTop: 10,borderBottomWidth:1,   padding: 10,marginHorizontal:10 }}
         placeholderTextColor='black'
         color='black'
         keyboardType="numeric"
          placeholder= {translation[143][selectedLanguages]}
          // "CVC - XXX"
          value={cvc}
          maxLength={3}
          selectionColor={colors.primary}
          onChangeText={(cvc) => setcvc(cvc)}
          theme={{
            colors: { primary: colors.primary },
          }}
        />
        {/* <View
          style={{
            flexDirection: "row",
            borderBottomColor: "gray",
            borderBottomWidth: 0,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
      */}
          <TextInput
            style={{ height: 50, backgroundColor: "white", marginTop: 10,borderBottomWidth:1,   padding: 10,marginHorizontal:10 }}
            placeholderTextColor='black'
            color='black'
            keyboardType="numeric"
          placeholder= {translation[144][selectedLanguages]}
          // "MM/YY"
          selectionColor={colors.primary}
          maxLength={5}
         
          onChangeText={(cvc) => handleExpirationDate(cvc)}
           value={expiratoinDate}
          theme={{
            colors: { primary: colors.primary },
          }}
        />
              
           
         
          {/* <View>
            <Feather name="calendar" color={"black"} size={20} />
          </View> */}
        {/* </View> */}
        
      </View>
    </View>
   
    <View
      style={{
        flex: 1,
        marginTop: "40%",
        marginHorizontal: 30,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: colors.yellow,
          justifyContent: "center",
          alignItems: "center",
          height: 45,
          borderRadius: 8,
        }}
        onPress={() => process()}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {/* Proceed */}
          {translation[103][selectedLanguages]}
          </Text>
      </TouchableOpacity>
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
  </ScrollView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  const { user, selectedLanguages, translation } = state.auth;
  return { user, selectedLanguages, translation };
};
export default connect(mapStateToProps, {paypayment,paypaymentride,addammountfortrip})(BillingPayment);





