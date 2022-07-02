import React from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import CustomText from './../components/Text';
import {Divider, RadioButton} from 'react-native-paper';
import colors from '../theme/colors';
import {BlurView} from '@react-native-community/blur';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fonts from '../theme/fonts';
const AlertModal = ({
  button1,
  button2,
  onYesPress,
  onNoPress,
  heading,
  subHeading,
  form,
  onOkPress,
}) => {
  return (
    <Modal
      isVisible={true}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={0.5}>
      <View
        style={{
          backgroundColor: '#FBFBFB',
          borderRadius: 7,
          borderWidth:1,
          flex: Platform.OS == 'android' ? 0.4 : 0.3,
        }}>
        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.question}>
            <Text
            onPress={onOkPress}
              style={{
                fontSize: 40,
                fontFamily: fonts.PoppinsBold,
                color: 'gray',
              }}>
              {form ? '!' : '?'}
            </Text>
          </View>
          <CustomText
            title={heading}
            type={'large'}
            color={'black'}
            style={{fontSize: 15, marginVertical: 10}}
          />
          <CustomText
            title={subHeading}
            type={'normal'}
            color={'black'}
            style={{fontSize: 13}}
          />
        </View>
        {!form && (
          <View
            style={{
              backgroundcolor: 'tomato',
              flexDirection: 'row',
              flex: 0.3,
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onYesPress}
              style={{
                backgroundColor: colors.primary,
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                borderBottomLeftRadius: 10,
                marginLeft: Platform.OS == 'android' ? -3 : -1,
              }}>
              <CustomText
                title={button1}
                type={'large'}
                color={'white'}
                style={{fontSize: 16}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={onNoPress}
              style={{
                backgroundColor: 'white',
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                borderBottomRightRadius: 10,
              }}>
              <CustomText
                title={button2}
                type={'large'}
                color={'black'}
                style={{fontSize: 15}}
              />
            </TouchableOpacity>
          </View>
        )}
        {form && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onOkPress}
            style={{
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <CustomText
              title={button1}
              type={'large'}
              color={'white'}
              style={{fontSize: 16}}
            />
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};
export default AlertModal;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  question: {
    height: 70,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});










// import React from 'react';
// import {
//   Text,
//   View,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import CustomText from './../components/Text';
// import {Divider, RadioButton} from 'react-native-paper';
// import colors from '../theme/colors';
// import {BlurView} from '@react-native-community/blur';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import fonts from '../theme/fonts';
// const AlertModal = ({
//   button1,
//   button2,
//   onYesPress,
//   onNoPress,
//   heading,
//   subHeading,
//   form,
//   onOkPress,
// }) => {
//   return (
//     <Modal
//       isVisible={true}
//       coverScreen={true}
//       hasBackdrop={true}
//       backdropOpacity={0.5}>
//       <View
//         style={{
//           backgroundColor: '#FBFBFB',
//           borderRadius: 7,
//           flex: Platform.OS == 'android' ? 0.4 : 0.3,
//         }}>
//         <View
//           style={{
//             flex: 0.8,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <View style={styles.question}>
//             <Text
//               style={{
//                 fontSize: 40,
//                 fontFamily: fonts.PoppinsBold,
//                 color: 'gray',
//               }}>
//               {form ? '!' : '?'}
//             </Text>
//           </View>
//           <CustomText
//             title={heading}
//             type={'large'}
//             color={'black'}
//             style={{fontSize: 15, marginVertical: 10}}
//           />
//           <CustomText
//             title={subHeading}
//             type={'normal'}
//             color={'black'}
//             style={{fontSize: 13}}
//           />
//         </View>
//         {!form && (
//           <View
//             style={{
//               backgroundcolor: 'tomato',
//               flexDirection: 'row',
//               flex: 0.3,
//               alignItems: 'flex-end',
//             }}>
//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={onYesPress}
//               style={{
//                 backgroundColor: colors.primary,
//                 flex: 1.5,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 paddingVertical: 20,
//                 borderBottomLeftRadius: 10,
//                 marginLeft: Platform.OS == 'android' ? -3 : -1,
//               }}>
//               <CustomText
//                 title={button1}
//                 type={'large'}
//                 color={'white'}
//                 style={{fontSize: 16}}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={onNoPress}
//               style={{
//                 backgroundColor: 'white',
//                 flex: 1.5,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 paddingVertical: 20,
//                 borderBottomRightRadius: 10,
//               }}>
//               <CustomText
//                 title={button2}
//                 type={'large'}
//                 color={'black'}
//                 style={{fontSize: 15}}
//               />
//             </TouchableOpacity>
//           </View>
//         )}
//         {form && (
//           <TouchableOpacity
//             activeOpacity={1}
//             onPress={onOkPress}
//             style={{
//               backgroundColor: colors.primary,
//               justifyContent: 'center',
//               alignItems: 'center',
//               paddingVertical: 20,
//               position: 'absolute',
//               bottom: 0,
//               width: '100%',
//             }}>
//             <CustomText
//               title={button1}
//               type={'large'}
//               color={'white'}
//               style={{fontSize: 16}}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </Modal>
//   );
// };

// export default AlertModal;
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   absolute: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   question: {
//     height: 70,
//     width: 70,
//     backgroundColor: 'white',
//     borderRadius: 100,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
