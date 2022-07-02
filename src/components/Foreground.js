import { useEffect } from "react";
import PushNotification from "react-native-push-notification";
import messaging from "@react-native-firebase/messaging";
import { PushNotificationIOS } from "react-native";
import { Platform } from "react-native";
const Foreground = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(`received in foreground`, remoteMessage);
      const { notification } = remoteMessage;
      if (Platform.OS === "ios") {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: "default",
        });
      } else {
        PushNotification.localNotification({
          channelId: "your-channel-id",
          id: messageId,
          title: notification.title,
          message: notification.message,
          playSound: true,
          soundName: "default",
          vibrate: true,
        });
      }
    });
    return unsubscribe();
  }, []);
  return null;
};
export default Foreground;
