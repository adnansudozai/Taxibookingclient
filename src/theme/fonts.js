import { Platform } from "react-native";
export default Fonts =
  Platform.OS == "ios"
    ? {
        PoppinsRegular: "RoundedMplus1c-Regular",
        PoppinsBold: "RoundedMplus1c-Bold",
        PoppinsMedium: "RoundedMplus1c-Medium",
      }
    : {
        PoppinsRegular: "RoundedMplus1c-Regular",
        PoppinsBold: "RoundedMplus1c-Bold",
        PoppinsMedium: "RoundedMplus1c-Medium",
      };
