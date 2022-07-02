import React from "react";
import { Text, StyleSheet, View } from "react-native";
import fonts from "../theme/fonts";
import propTypes from "prop-types";

const CustomText = ({
  title,
  color,
  type,
  textAlign,
  style,
  numberOfLines,
  children,
  onPress,
  size,
  count,
}) => {
  const { normalStyle, semiBoldStyle, boldStyle } = styles;
  const textStyle =
    type === "normal"
      ? normalStyle
      : type === "medium"
      ? semiBoldStyle
      : boldStyle;
  return (
    <View>
      <Text
        onPress={onPress}
        numberOfLines={numberOfLines}
        style={[textStyle, style, { color, textAlign }]}
      >
        {title}
        {children}
      </Text>
      {count && count !== "0" ? (
        <Text
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            backgroundColor: "#ff0000",
            height: 20,
            width: 20,
            borderRadius: 20 / 2,
            textAlign: "center",
            color: "white",
          }}
        >
          {count}
        </Text>
      ) : null}
    </View>
  );
};

export const CustomTextMessages = ({
  title,
  color,
  type,
  textAlign,
  style,
  numberOfLines,
  children,
  onPress,
  size,
  count,
}) => {
  const { normalStyle, semiBoldStyle, boldStyle } = styles;
  const textStyle =
    type === "normal"
      ? normalStyle
      : type === "medium"
      ? semiBoldStyle
      : boldStyle;
  return (
    <View>
      <Text
        onPress={onPress}
        numberOfLines={numberOfLines}
        style={[textStyle, style, { color, textAlign }]}
      >
        {title}
        {children}
      </Text>
      {count && count !== "0" ? (
        <Text
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            backgroundColor: "#ff0000",
            height: 20,
            width: 20,
            borderRadius: 20 / 2,
            textAlign: "center",
            color: "white",
          }}
        >
          {count}
        </Text>
      ) : null}
    </View>
  );
};

const margin = 10;
const styles = StyleSheet.create({
  normalStyle: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    //  margin,
  },
  semiBoldStyle: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    // margin,
  },
  boldStyle: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 16,
    // margin,
  },
});

CustomText.propTypes = {
  type: propTypes.string,
  color: propTypes.string,
  title: propTypes.string,
  textAlign: propTypes.string,
  style: propTypes.any,
  size: propTypes.number,
};

export default CustomText;
