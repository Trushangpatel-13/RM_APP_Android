import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Alert, BackHandler } from 'react-native';
import { AppHeader, SearchHeader } from '../SearchBar';
import COLORS from '../conts/colors';
import Feather from 'react-native-vector-icons/Feather'
import { TextInput, IconButton, Colors } from 'react-native-paper';
import CustomCard from '../components/Card';
import axios from 'axios';
import { BASEURL } from '../URL';
import StepIndicator from 'react-native-step-indicator';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const labels = ["RMC", "RMP", "RMO", "RMS", "Quality"];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 33,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: 'black',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'black',
  stepStrokeUnFinishedColor: 'black',
  separatorFinishedColor: 'black',
  separatorUnFinishedColor: 'black',
  stepIndicatorFinishedColor: '#4dff4d',
  stepIndicatorUnFinishedColor: '#ff4d4d',
  stepIndicatorCurrentColor: '#ff4d4d',
  stepIndicatorLabelFontSize: 5,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: 'black',
  currentStepIndicatorLabelFontSize: 20,
  labelSize: 18,
  currentStepLabelColor: 'black'

}
const HomeScreen = ({ navigation, route }) => {
  const [userDetails, setUserDetails] = React.useState({});
  const [IBODetails, setIBODetails] = React.useState();
  const [snapshot, setSnapshot] = React.useState({});
  const [isData, setIsData] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [IBOInput, setIBOInput] = React.useState("");
  const [flip, setFlip] = React.useState(false)

  searchInput = React.createRef();
  React.useEffect(() => {
    getUserData = async () => {

      let userData = await AsyncStorage.getItem('userData');

      if (userData) {

        setUserDetails(JSON.parse(userData));
        //console.log("Home Screen",userData);
      }
      //console.log("Insid")
      //setUserDetails(route.params.data)
    };
    getUserData();
  }, []);

  const displayIBO = async () => {
    let IBOData = await AsyncStorage.getItem('IBOData');
    console.log("Outside", IBODetails)
    if (IBODetails != null) {
      setIBODetails(JSON.parse(IBOData).IBONo)
    }
  }




  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData()
      displayIBO()
    });

    return unsubscribe;
  }, [navigation, IBODetails]);


  React.useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Unsaved Changes will be discarded", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => { logout() } }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const handlesubmit = async (searchText) => {


    let UserData = await AsyncStorage.getItem('userData');
    User = JSON.parse(UserData).Employee_ID



    await AsyncStorage.setItem(
      'IBOData',
      JSON.stringify({ IBONo: searchText, Emp_ID: 1233 }),
    );

    UserData = await AsyncStorage.getItem('IBOData');



  }
  const search = async () => {

    let IBOData = await AsyncStorage.getItem('IBOData');
    if (IBOData != null) {
      let data = JSON.parse(IBOData).IBONo
      console.log("IBO", IBOInput)
      let res_code = 0
      await axios({
        method: "get",
        params: { IBO: data },
        url: BASEURL + "/data/get/all",
        headers: { "Access-Control-Allow-Origin": '*' },
      }).then((response) => {

        setData(response.data.payload)
        setSnapshot(response.data.payload)
        setLoading(false)
        res_code = response.status
      }).catch((error) => {

        if (error.response) {

          if (error.response.status) {
            Alert.alert("Error", "Invalid IBO No")
          }

        } else {

          //console.log('Error', error.message);
        }
        //console.log(error.config);
      });
    }

    //displayIBO();

    //console.log(searchInput)
    searchInput.current.clear();

  }
  const setData = async (val) => {
    await AsyncStorage.setItem(
      'snapshot', JSON.stringify(val),
    );
  }


  const logout = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({ loggedIn: false }),
    );
    await AsyncStorage.setItem(
      'IBOData',
      JSON.stringify({ IBONo: null }),
    );
    setLoading(true)
    navigation.navigate('LoginScreen');
    BackHandler.exitApp();
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        title={userDetails.First_Name + " " + userDetails.Last_Name}
        menu="menu"
        optionalBtn="log-out"
        headerBg="#bebebe"
        titleAlight='center'
        onRightPress={() => { logout() }}
        fweight={700}
      />
      <View style={{ width: "100%", flex: 1 }}>
        <View style={{
          padding: 5,
          flexDirection: 'row',
          width: "100%",
          backgroundColor: "#bebebe",
          alignItems: 'center'
        }}>

          <TextInput
            ref={searchInput}
            style={{ fontSize: 15, width: "70%", marginLeft: 5 }}
            placeholder="Enter IBO No"
            maxLength={15}
            keyboardType="phone-pad"
            onEndEditing={(value) => { handlesubmit(value.nativeEvent.text) }}
          />
          <View style={styles.search_button}>
            <IconButton icon="search-web" color='red' size={deviceHeight * 0.04} onPress={() => search()} />
            <IconButton icon="camera" color='red' size={deviceHeight * 0.04} onPress={() => navigation.navigate('Scan')} />
          </View>
        </View>
        {!loading ?
          <View>
            <Text style={styles.textTitle}>Current Motor</Text>
            <View style={{ alignItems: 'center' }}>

              {!flip ?
                <CustomCard style={styles.cardView}>


                  <View style={{ flexWrap: 'wrap', flexDirection: 'row', height: deviceHeight * 0.08 }}>

                    <View style={[{ flexBasis: '20%', height: deviceHeight * 0.08, padding: 5 }]}>
                      <TouchableOpacity style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 5, borderRadius: 5 }, { backgroundColor: (snapshot['Tech_RMC_ID'] && snapshot['RMC_Dt']) ? '#80ff80' : null }]} onPress={() => navigation.navigate('RMCHome')}>
                        <Image source={require('../assets/icons/RMC-C.png')} style={{ height: 50, width: 50, marginHorizontal: 5 }}></Image>
                      </TouchableOpacity>
                    </View>

                    <View style={[{ flexBasis: '20%', height: deviceHeight * 0.08, padding: 5 }]}>
                      <TouchableOpacity style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 5, borderRadius: 5 }, { backgroundColor: (snapshot['Tech_RMP_ID'] && snapshot['RMP_Dt']) ? '#80ff80' : null }]} onPress={() => navigation.navigate('RMPHome')}>
                        <Image source={require('../assets/icons/RMP-C.png')} style={{ height: 50, width: 50, marginHorizontal: 5 }}></Image>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexBasis: '20%', height: deviceHeight * 0.08, padding: 5 }}>
                      <TouchableOpacity style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 5, borderRadius: 5 }, { backgroundColor: (snapshot['Tech_RMO_ID'] && snapshot['RMO_Dt']) ? '#80ff80' : null }]} onPress={() => navigation.navigate('RMOHome')}>
                        <Image source={require('../assets/icons/RMO-C.png')} style={{ height: 50, width: 50, marginHorizontal: 5 }}></Image>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexBasis: '20%', height: deviceHeight * 0.08, padding: 5 }} >
                      <TouchableOpacity style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 5, borderRadius: 5 }, { backgroundColor: (snapshot['Tech_RMS_ID'] && snapshot['RMS_Dt']) ? '#80ff80' : null }]} onPress={() => navigation.navigate('RMSHome')}>
                        <Image source={require('../assets/icons/RMS-C.png')} style={{ height: 50, width: 50, marginHorizontal: 5 }}></Image>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexBasis: '20%', height: deviceHeight * 0.08, padding: 5 }}>
                      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../assets/icons/RMQ-C.png')} style={{ height: 50, width: 50, marginHorizontal: 5, borderRadius: 5 }}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.CardContent}>
                    <Text style={{ ...styles.textTitleCard, fontSize: 22, backgroundColor: 'white' }}>IBO No : {snapshot.IBO_no}</Text>
                    <Text style={styles.textTitleCard}>Customer No: ({snapshot.Customer_no}) {snapshot.Customer_name}</Text>
                    <Text style={styles.textTitleCard}>Part No: {snapshot.Part_no}</Text>
                    <Text style={styles.textTitleCard}>RM No: {snapshot.RM_No}</Text>
                    <Text style={styles.textTitleCard}>Gate Pass : {snapshot.Gate_pass_no}</Text>
                  </View>


                  <View style={{ alignItems: 'flex-end', marginTop: deviceHeight * 0.001, marginHorizontal: deviceWidth * 0.02 }}>
                    <TouchableOpacity onPress={() => { setFlip(!flip) }}>
                      <Text style={{ color: 'black', fontWeight: '700' }}>BACK</Text>
                    </TouchableOpacity>
                  </View>
                </CustomCard>
                :
                <CustomCard style={styles.cardView}>

                  <View style={styles.CardContent}>
                    {(snapshot['Tech_RMC_ID'] && snapshot['RMC_Dt']) ?
                      <Text style={{ ...styles.textTitleCard, fontSize: 20, marginVertical: 5 }}>RMC: {snapshot['Tech_RMC_ID']} at {snapshot['RMC_Dt']}</Text>
                      : null}

                    {(snapshot['Tech_RMP_ID'] && snapshot['RMP_Dt']) ?
                      <Text style={{ ...styles.textTitleCard, fontSize: 20, marginVertical: 5 }}>RMP: {snapshot['Tech_RMP_ID']} at {snapshot['RMP_Dt']}</Text>
                      : null}

                    {(snapshot['Tech_RMO_ID'] && snapshot['RMO_Dt']) ?
                      <Text style={{ ...styles.textTitleCard, fontSize: 20, marginVertical: 5 }}>RMO: {snapshot['Tech_RMO_ID']} at {snapshot['RMO_Dt']}</Text>
                      : null}

                    {(snapshot['Tech_RMS_ID'] && snapshot['RMS_Dt']) ?
                      <Text style={{ ...styles.textTitleCard, fontSize: 20, marginVertical: 5 }}>RMS: {snapshot['Tech_RMS_ID']} at {snapshot['RMS_Dt']}</Text>
                      : null}

                  </View>


                  <View style={{ alignItems: 'flex-end', marginTop: deviceHeight * 0.001, marginHorizontal: deviceWidth * 0.02 }}>
                    <TouchableOpacity onPress={() => { setFlip(!flip) }}>
                      <Text style={{ color: 'black', fontWeight: '700' }}>BACK</Text>
                    </TouchableOpacity>
                  </View>
                </CustomCard>
              }

            </View>
          </View>
          :
          <CustomCard style={{ ...styles.cardView, height: deviceHeight * 0.1 }}>
            <View style={{ ...styles.CardContent, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ ...styles.textTitleCard, fontSize: 22 }}>Please Select / Scan IBO No</Text>
            </View>
          </CustomCard>
        }


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  search_button: {
    margin: 2,
    color: 'red',
    flexDirection: 'row'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
  },
  cardView: {
    height: deviceHeight * 0.34,
    width: '98%',
    marginTop: 10,
    backgroundColor: '#d9d9d9',

  },
  cardViewIndicator: {
    height: deviceHeight * 0.34,
    width: '98%',
    marginVertical: 3,
    backgroundColor: '#d9d9d9',

  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 8,
    color: 'black'
  },

  textTitleCard: {
    fontFamily: 'Courier_Bold',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 2,
    color: 'black',

  },
  CardContent: {
    flex: 1,
  },
  CardButton: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: 'row'
  },
  Done: {
    color: 'white'
  },
  Pending: {
    color: 'black'
  }

})