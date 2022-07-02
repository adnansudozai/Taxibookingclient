import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  main: {
    height: height,
    width: width,
  },
});
export default styles;
