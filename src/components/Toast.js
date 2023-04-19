import {View, StyleSheet, ToastAndroid, Button, StatusBar, Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
/*export const showToast = ({payload}) => {
    console.log(payload)
    ToastAndroid.showWithGravityAndOffset(
      payload,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      250,
    );
  };
  */

  export const showToast = (type,heading,text) => {
    Toast.show({
      type: type,
      text1: heading,
      text2: text,
      visibilityTime: 2000,  
      position:'bottom',
      bottomOffset: deviceHeight*0.08,
      
    });
  }