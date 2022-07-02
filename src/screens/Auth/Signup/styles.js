import { StyleSheet } from "react-native";
import fonts from "../../../theme/fonts";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  logo_blue: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "10%",
  },
  containerStyle: {
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.primary,
    padding: 15,

    // height: 45,
    justifyContent: "center",
    margin: 10,
    marginTop: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomWidth: 0.8,
    borderBottomColor: colors.primary,
    width: "25%",
    paddingBottom: 10,
    marginVertical: 10,

    marginLeft: 20,
    justifyContent: "space-around",
  },
  radio: {
    flexDirection: "row",
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default styles;
