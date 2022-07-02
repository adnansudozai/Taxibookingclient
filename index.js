/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import PushNotification, { Importance } from "react-native-push-notification";

//Creating Channel Start
PushNotification.createChannel(
  {
    channelId: "2223", // (required)
    channelName: "default", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => {} // (optional) callback returns whether the channel was created, false means it already existed.
);
//Creating Channel End

// Register background handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
