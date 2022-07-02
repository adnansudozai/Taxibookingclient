import React from "react";
// import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';

import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { edit } from "../../assets";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";
import { color } from "react-native-reanimated";
import CustomText from "../../components/Text";
export const Input = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.darkgray,
  onRightIconPress,
}) => {
  return (
    <View style={styles.container}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 15,
          marginTop: Platform.OS === "ios" ? 15 : 20,
        }}
      />
      <View style={styles.inputContainer}>
        <View
          style={{
            width: "10%",
            justifyContent: "center",
          }}
        >
          <Image source={left} style={styles.icon} />
        </View>

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Image source={right} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const Input1 = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.darkgray,
  onRightIconPress,
}) => {
  return (
    <View style={styles.container}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 15,
          marginTop: Platform.OS === "ios" ? 15 : 20,
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
      </View>
    </View>
  );
};
export const InputDashboard = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.darkgray,
  onRightIconPress,
}) => {
  return (
    <View style={styles.containerDashboard}>
      {/* <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{
          fontSize: 16,
          fontWeight: "bold",
          // marginBottom: 15,
          // marginTop: Platform.OS === "ios" ? 15 : 20,
        }}
      /> */}
      <View style={styles.inputContainerDashboard}>
        {/* <View
          style={{
            width: "10%",
            justifyContent: "center",
          }}
        >
          <Image source={left} style={styles.icon} />
        </View> */}

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        {/* <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Image source={right} style={styles.icon} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
export const InputPJ = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.darkgray,
  onRightIconPress,
}) => {
  return (
    <View style={styles.container}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 15,
          marginTop: Platform.OS === "ios" ? 15 : 20,
        }}
      />
      <View style={styles.inputContainer}>
        <View
          style={{
            width: "5%",
            justifyContent: "center",
          }}
        >
          <Image source={left} style={styles.icon} />
        </View>

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          style={{
            width: "13%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Image source={right} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Inputchangepassword = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = "black",
  onRightIconPress,
}) => {
  return (
    <View style={styles.containerch}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{ fontSize: 13, fontWeight: "bold", marginBottom: 10 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.inputchangepassword}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Image source={right} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const InputProfile = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = "black",
  onRightIconPress,
}) => {
  return (
    <View style={styles.containerProfile}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{ fontSize: 13, fontWeight: "bold" }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.inputchangepassword}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Image source={edit} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const InputPhone = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.darkgray,
  onRightIconPress,
  countrycode,
}) => {
  return (
    <View style={styles.container}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{
          fontSize: 16,
          marginTop: 25,
          fontWeight: "bold",
          paddingBottom: 5,
        }}
      />
      <View style={[styles.inputContainermobile]}>
        {/* <TouchableOpacity
          onPress={onRightIconPress}
          style={{
            width: '13%',
            justifyContent: 'center',
            backgroundColor: colors.lightGray,
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{textAlign: 'center'}}>{countrycode}</Text>

            <Text style={{textAlign: 'center', paddingTop: 2}}>
              <EvilIcons name="chevron-down" size={16} color="black" />
            </Text>
          </View>
        </TouchableOpacity> */}

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
      </View>
    </View>
  );
};
export const InputPhone1 = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.primary,
  onRightIconPress,
  countrycode,
}) => {
  return (
    <View style={styles.container1}>
      <CustomText
        title={placeholder}
        type={"large"}
        color={textColor}
        style={{ fontSize: 13, marginTop: 12 }}
      />
      <View style={[styles.inputContainermobile]}>
        <TouchableOpacity
          onPress={onRightIconPress}
          style={{
            width: "13%",

            backgroundColor: colors.lightGray,
            borderRadius: 7,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
            marginLeft: 8,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ textAlign: "center" }}>{countrycode}</Text>

            <Text style={{ textAlign: "center", paddingTop: 2 }}>
              <EvilIcons name="chevron-down" size={16} color="black" />
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
      </View>
    </View>
  );
};
export const InputPhone2 = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.primary,
  onRightIconPress,
  countrycode,
}) => {
  return (
    <View style={styles.container2}>
      <CustomText
        title={placeholder}
        type={"large"}
        color={textColor}
        style={{ fontSize: 13, marginTop: Platform.OS === "ios" ? 50 : 40 }}
      />
      <View style={[styles.inputContainermobile2]}>
        <TouchableOpacity
          onPress={onRightIconPress}
          style={{
            // width: '13%',
            justifyContent: "center",
            // backgroundColor: colors.lightGray,
            // borderRadius: 7,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ textAlign: "center", color: "gray" }}>Comments</Text>

            {/* <Text style={{textAlign: 'center', paddingTop: 2}}>
              <EvilIcons name="chevron-down" size={16} color="black" />
            </Text> */}
          </View>
        </TouchableOpacity>

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
      </View>
    </View>
  );
};

////input for signup secreen

export const Inputpassword = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,

  textColor = "black",
  onRightIconPress,
}) => {
  return (
    <View style={styles.container}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{
          fontSize: 13,
          fontWeight: "bold",
          marginTop: Platform.OS === "ios" ? 20 : 15,
        }}
      />
      <View style={styles.inputContainer}>
        <View
          style={{
            width: "10%",
            justifyContent: "center",
          }}
        >
          <Image source={left} style={styles.icon} />
        </View>

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRightIconPress}
          style={{
            width: "10%",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: 10,
            paddingTop: 30,
          }}
        >
          <Image source={right} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// export const InputPhone = ({
//   placeholder,
//   onChangeText,
//   style,
//   iseditable,
//   isSecure,
//   keyboardType,
//   right,
//   left,
//   onFocus,
//   value,
//   textColor = colors.primary,
//   onRightIconPress,
//   countrycode
// }) => {
//   return (
//     <View style={styles.container}>
//       <CustomText
//         title={placeholder}
//         type={'large'}
//         color={textColor}
//         style={{fontSize: 13,marginTop:25}}
//       />
//       <View style={[styles.inputContainermobile]}>
//         <TouchableOpacity
//           onPress={onRightIconPress}
//           style={{
//             width: '13%',
//             justifyContent: 'center',
//             backgroundColor: colors.lightGray,
//             borderRadius: 7,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <View style={{flexDirection:'row'}}>
//             <Text style={{textAlign: 'center'}}>
//               {countrycode}
//             </Text>

//             <Text style={{textAlign: 'center',paddingTop:2}}>
//               <EvilIcons name="chevron-down" size={16} color="black" />
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TextInput
//           keyboardType={keyboardType}
//           onFocus={onFocus}
//           style={styles.input}
//           editable={iseditable}
//           value={value}
//           onChangeText={onChangeText}
//           secureTextEntry={isSecure}
//         />
//       </View>
//     </View>
//   );
// };

export const InputUser = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.primary,
  onRightIconPress,
  countrycode,
}) => {
  return (
    <View style={styles.container}>
      <CustomText
        title={placeholder}
        type={"large"}
        color={textColor}
        style={{ fontSize: 13, marginTop: 25 }}
      />
      <View style={[styles.inputContainermobile]}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ textAlign: "center", paddingTop: 15, paddingBottom: 8 }}
          >
            <FontAwesome5 name="user" size={16} color="blue" />
          </Text>
        </View>

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
      </View>
    </View>
  );
};

export const InputUserSignup = ({
  placeholder,
  onChangeText,
  style,
  iseditable,
  isSecure,
  keyboardType,
  right,
  left,
  onFocus,
  value,
  textColor = colors.darkgray,
  onRightIconPress,
  countrycode,
}) => {
  return (
    <View style={[styles.containersignup, {}]}>
      <CustomText
        title={placeholder}
        type={"medium"}
        color={textColor}
        style={{
          fontSize: 15,
          paddingTop: 25,

          fontWeight: "bold",
        }}
      />
      <View style={[styles.inputContainerSignup, {}]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            paddingLeft: 0,
            marginRight: 5,
          }}
        >
          <FontAwesome5 name="user-alt" size={16} color={"#E28F25"} />
        </View>

        <TextInput
          keyboardType={keyboardType}
          onFocus={onFocus}
          style={styles.input}
          editable={iseditable}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: 20,
    // backgroundColor: colors.primary,
    width: "90%",
    // padding: Platform.os == 'ios' ? 40 : 0,
    borderBottomWidth: 1,
    borderColor: "gray",
    // marginVertical: 10,
  },
  containerDashboard: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: 20,
    // backgroundColor: colors.primary,
    width: "90%",
    //padding: Platform.os == 'ios' ? 40 : 0,
    borderBottomWidth: 1,
    borderColor: "gray",

    // marginVertical: 10,
  },

  containerch: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: 20,
    // backgroundColor: colors.primary,
    width: "90%",
    // padding: Platform.os == 'ios' ? 40 : 0,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
  },
  containerProfile: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    // marginLeft: 20,
    // backgroundColor: colors.primary,
    width: "95%",
    // padding: Platform.os == 'ios' ? 40 : 0,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
  },
  containersignup: {
    fontSize: 15,
    fontFamily: fonts.PoppinsBold,
    marginLeft: 20,
    // backgroundColor: colors.primary,
    width: "90%",
    // padding: Platform.os == 'ios' ? 40 : 0,
    borderBottomWidth: 0.4,
    borderColor: "gray",
    marginVertical: 0,
  },
  container1: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    borderBottomWidth: 1,

    // marginLeft: 10,
    // backgroundColor: colors.primary,
    width: "95%",
    // padding: Platform.os == 'ios' ? 40 : 0,

    borderColor: "gray",
    marginVertical: 10,
  },
  container2: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    borderBottomWidth: 1,

    marginLeft: 25,
    // backgroundColor: colors.primary,

    // padding: Platform.os == 'ios' ? 40 : 0,

    borderColor: "gray",
    marginVertical: 10,
    marginHorizontal: 10,
  },

  inputContainer: {
    backgroundColor: colors.white,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 6,
  },
  inputContainerDashboard: {
    width: "100%",
    // alignSelf: "center",
    flexDirection: "row",
    // paddingBottom: 6,
  },
  inputContainermobile: {
    backgroundColor: colors.white,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 6,
    marginTop: 7,
  },
  inputContainerSignup: {
    backgroundColor: colors.white,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 6,
    marginTop: 7,
  },
  inputContainermobile2: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 10,
    marginTop: 7,
  },

  input: {
    width: "80%",
    backgroundColor: "transparent",
    color: "black",
    fontFamily: fonts.PoppinsMedium,
    padding: Platform.OS == "ios" ? 10 : 0,
  },

  inputchangepassword: {
    width: "90%",
    backgroundColor: "transparent",
    color: "black",
    fontFamily: fonts.PoppinsMedium,
    padding: Platform.OS == "ios" ? 10 : 0,
  },

  icon: {
    height: 14,
    width: 14,
    resizeMode: "contain",
    tintColor: colors.yellow,
    // alignSelf: 'center',
  },
  // textInput: {
  //   fontSize: 15,
  //   fontFamily: fonts.PoppinsRegular,
  //   marginLeft: 20,
  //   backgroundColor: colors.primary,
  //   width: '90%',
  //   marginVertical: 7,
  //   padding: 0,
  //   borderBottomWidth: 0.4,
  //   borderColor: 'gray',
  // },
});
