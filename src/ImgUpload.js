import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Platform, PermissionsAndroid, ToastAndroid } from 'react-native';
import axios from "axios";
import { BASEURL } from './URL';
import Slider from './components/Slider';
import CommonHeader from './components/CommonHeader';
import { showToast } from './components/Toast';
import { role_auth } from './utilities/RoleAuth';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

let loading = false
let allow = false
const ImgUpload = ({navigation,Process}) => {
  const [filePath, setFilePath] = React.useState({});
  const [userrole, setUserrole] = React.useState({})
  const [allow,setAllow] = React.useState(false)   
  
  React.useEffect(() => {
    getRoleData = async () => {
      let role = await role_auth()
      console.log("Role",role[Process])
      if(role[Process] === true){
        
        //allow = true
        setAllow(true)
        
        console.log(allow)
      }
      else{
        setAllow(false)
        //allow = false
        
      }
      loading = true
      console.log(loading)
    }
    getRoleData()
}, [allow,loading])

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
          const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      quality: 0.5,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, (response) => {
        //console.log('Response = ', response.assets[0]);
        //console.log('fileName -> ', response.assets[0].fileName);
        //console.log('uri -> ', response.assets[0].uri);
        console.log(response)
        if (response.didCancel) {
          alert('User cancelled Camera Picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        //setFilePath(response);
        uploadImage(response.assets[0].uri, response.assets[0].type, response.assets[0].fileName)
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 720,
      maxHeight: 1080,
      quality: 0.75,
    };
    launchImageLibrary(options, (response) => {
      //console.log('Response = ', response.assets[0]);

      //console.log('fileName -> ', response.assets[0].fileName);
      //console.log('uri -> ', response.assets[0].uri);
      if (response.didCancel) {
        alert('User Cancelled Camera Picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath(response);
      uploadImage(response.assets[0].uri, response.assets[0].type, response.assets[0].fileName)
    });
  };

  const handleSlider = async() =>{
    let data = await getData()
    console.log("Img upload",Process)
    navigation.navigate("Slider",{Proc:Process,IBO_No:data.IBO})
  }

  const getData = async() =>{
    let IBOData = await AsyncStorage.getItem('IBOData');
    let IBONo = JSON.parse(IBOData).IBONo;
    let Emp = JSON.parse(IBOData).Emp_ID;
    return {IBO:IBONo,ID:Emp}
  }
  const uploadImage = async (uri, type, filename) => {

    
    data  = await getData();
    console.log("ImgUpload",data)
    const formdata = new FormData()
    formdata.append('file', { uri: uri, type: type, name: filename })
    formdata.append('ibo', data.IBO)
    formdata.append('Process', Process)
    formdata.append('Emp', data.ID)
    console.log(formdata)
    axios({
      method: "post",
      url: BASEURL + "/image/upload",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": '*' },
    })
      .then((response) => {
        console.log(response.data);
        if(response.status==200){
        showToast("success",Process,'Image Uploaded Successfully')
        }
        else{
        showToast("Error",Process,'Please Try Again')
        }
      });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ?
      <View style={styles.container}>
        {allow ? 
    
        <View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>
            Launch Camera for Image
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        </View>
        :null}
        <TouchableOpacity
          activeOpacity={0.5}
          style={{...styles.buttonStyle,marginTop:100}}
          onPress={() => handleSlider()}>
          <Text style={styles.textStyle}>
            View Image
          </Text>
        </TouchableOpacity>

      </View>
      :null}
    </SafeAreaView>
  );
};

export default ImgUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent:'center',
    justifyContent:'center'
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    fontSize:15,
    fontWeight:700,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#999999',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});