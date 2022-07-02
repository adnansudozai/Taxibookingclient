import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerImg: {
    height: height / 2,
    width: '100%',
  },
  logo: {
    height: height / 5,
    width: width / 1.5,
    alignSelf: 'center',
  },
});
export default styles;
