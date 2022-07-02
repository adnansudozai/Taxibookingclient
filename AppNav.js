/** @format */

import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
//screens
import DrawerContent from "./src/navigation/DrawerContent";
import { connect } from "react-redux";

import Splash from "./src/screens/Auth/Splash";
import TransactionDeclined from "./src/screens/App/TransactionDeclined";
import Signup from "./src/screens/Auth/Signup";
import OTP from "./src/screens/Auth/Registration/OTP";
import Success from "./src/screens/Auth/Success";
import EditProfile from "./src/screens/App/EditProfile";
import TermsCondition from "./src/screens/App/TermsCondition";
import Ratings from "./src/screens/App/Ratings/Ratings";
import TripHistory from "./src/screens/App/TripHistory/TripHistory";
import Wallet from "./src/screens/App/Wallet";
import MyLocation from "./src/screens/App/MyLocation/MyLocation";
import Support from "./src/screens/App/Support";
import ListDriver from "./src/screens/App/ListDriver/ListDriver";
import Map from "./src/screens/App/Map";
import chatting from "./src/screens/App/chatting";

import PlacesApi from "./src/screens/App/PlacesApi";
import RideAmmount from "./src/screens/App/PayRideammount";

import ChangeLanguage from "./src/screens/App/ChangeLanguage";
import ArrivalStatus from "./src/screens/App/ArrivalStatus";
import BillingPayment from "./src/screens/App/BillingPayment";
import BlockedDrivers from "./src/screens/App/BlockedDrivers/BlockedDrivers";
import OtpSignUp from "./src/screens/Auth/OtpSignUp";
import { LogBox } from "react-native";
import Contactus from "./src/screens/App/Contactus/Contactus";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
export function DrawerNav({ isLoggedIn }) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName={!isLoggedIn ? "Splash" : "Splash"}
      >
        <Drawer.Screen name="Splash" component={Splash} />
        <Drawer.Screen name="BlockedDrivers" component={BlockedDrivers} />
        <Drawer.Screen
          name="TransactionDeclined"
          component={TransactionDeclined}
        />
        <Drawer.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen name="RideAmmount" component={RideAmmount} />
        <Drawer.Screen
          name="Signup"
          component={Signup}
          options={{ swipeEnabled: false }}
        />
        <Drawer.Screen name="OTP" component={OTP} />
        <Drawer.Screen name="Success" component={Success} />
        <Drawer.Screen name="Ratings" component={Ratings} />
        <Drawer.Screen name="TripHistory" component={TripHistory} />
        <Drawer.Screen name="MyLocation" component={MyLocation} />
        <Drawer.Screen name="Wallet" component={Wallet} />
        <Drawer.Screen name="Support" component={Support} />
        <Drawer.Screen name="ListDriver" component={ListDriver} />
        <Drawer.Screen name="TermsCondition" component={TermsCondition} />
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="chatting" component={chatting} />

        <Drawer.Screen name="PlacesApi" component={PlacesApi} />
        <Drawer.Screen name="ArrivalStatus" component={ArrivalStatus} />
        <Drawer.Screen name="BillingPayment" component={BillingPayment} />
        <Drawer.Screen name="OtpSignUp" component={OtpSignUp} />
        <Drawer.Screen name="Contactus" component={Contactus} />
        <Drawer.Screen name="ChangeLanguage" component={ChangeLanguage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

LogBox.ignoreAllLogs();
function AppNav({ route }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
        options={{ gestureEnabled: true, gestureDirection: "horizontal" }}
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="PaymentInformation"
          component={PaymentInformation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OtpSignUp"
          component={OtpSignUp}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="RideAmmount"
          component={RideAmmount}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="PlacesApi"
          component={PlacesApi}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="Stripe"
          component={Stripe}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="Paypal"
          component={Paypal}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{ headerShown: false, animationEnabled: true }}
        />

        <Stack.Screen
          name="chatting"
          component={chatting}
          options={{ headerShown: false, animationEnabled: true }}
        />
        <Stack.Screen
          name="Root"
          component={BottomTab}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contactus"
          component={Contactus}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppNav);
