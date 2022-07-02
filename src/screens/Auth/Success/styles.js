import { StyleSheet } from "react-native";
import fonts from "../../../theme/fonts";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  containerStyle: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.primary,
    padding: 15,

    // height: 45,
    justifyContent: "center",
    margin: 10,
    marginTop: 50,
  },
  logo_blue: {
    height: 300,
    width: 300,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 100,
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
  input: {
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: 20,
    backgroundColor: "white",
    width: "90%",
    marginVertical: 5,
  },
});
export default styles;
