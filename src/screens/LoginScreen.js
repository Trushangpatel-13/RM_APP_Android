import React from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert, TextInput, Dimensions } from 'react-native';
import COLORS from '../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { BASEURL } from '../URL';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { SelectList } from 'react-native-dropdown-select-list'

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  
  EmpInput = React.createRef();
  PassInput = React.createRef();
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError('Please Enter Employee ID', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('userData');
      console.log(userData);

      userData = JSON.parse(userData);
      console.log("Login", userData);
      let formdata = new FormData();
      formdata.append("employee_id", inputs.email)
      formdata.append("password", inputs.password)

      await axios({
        method: "post",
        url: BASEURL + "/user/login",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": '*'
        },
      })
        .then(async (response) => {
          console.log(response)
          setInputs(prevState => ({ ...prevState, ['email']: '' }));
          setInputs(prevState => ({ ...prevState, ['password']: '' }));
          let current_time = parseInt(Date.now() / 1000);
          if (response.status == 200) {

            //var decoded = jwt_decode(response.data.token);
            var decoded = jwt_decode(response.data.token);
            console.log("Login Screen", decoded['payload'])
            let saveData = Object.assign({ loggedIn: true }, { token: response.data.token }, decoded['payload'], { exp: decoded['exp'] })
            console.log("SaveData", saveData);
            await AsyncStorage.setItem(
              'userData', JSON.stringify(saveData),
            );

            navigation.navigate('HomeScreen', { data: saveData });
          }
          if (response.status == 204) {
            Alert.alert('Error', 'Invalid Details');
          }
        });




    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.grey, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Log In
        </Text>

        <View style={{ marginVertical: 20 }}>

          
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            label="Employee ID"
            placeholder="Enter your Employee ID"
            keyboardType='numeric'
            placeholderTextColor='black'
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            label="Password"
            placeholder="Enter your password"
            placeholderTextColor='black'
            error={errors.password}
            password
          />
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Change Password
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
