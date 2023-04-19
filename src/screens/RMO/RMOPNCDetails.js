import { MultipleSelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { BASEURL } from '../../URL';
import Loader from '../../components/Loader';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import { getKeybyValue, getCommonKey, getDefaultList, bool_update, unselected, val_update } from '../../components/func';
import { RMC_BASIC, RMC_BASIC_DATA } from '../../components/form_constant';
import { update_db } from '../../components/APIManager';
import CommonHeader from '../../components/CommonHeader';
import { showToast } from '../../components/Toast';
import { role_auth } from '../../utilities/RoleAuth';
import { getDateTime } from '../../utilities/DateTime';
import SubmitHeader from '../../components/SubmitHeader';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;


let PNCData = {}
export const RMOPNCDetails = () => {
  const [userrole, setUserrole] = React.useState({})
  const [data, Setdata] = React.useState([])

  const [defVal, setDefVal] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [snap, setSnap] = React.useState({})
  const [param, setParam] = React.useState({})

  const [check_K1, setCheck_K1] = React.useState()
  const [check_N1, setCheck_N1] = React.useState()
  const [check_Z1, setCheck_Z1] = React.useState()

  useEffect(() => {
    getFormData = async () => {
      let snapshot = await AsyncStorage.getItem('snapshot');
      PNCData = JSON.parse(snapshot)
      setSnap(PNCData)
      Setdata(RMC_BASIC_DATA)
      setParam(RMC_BASIC)
      setUserrole(await role_auth())

    }
    getFormData()
  }, [])

  useEffect(() => {

    let common = getKeybyValue(snap, 1, Object.keys(param))

    console.log("Value", common)
    if (common.length == 0) {
      setLoading(false)
    }
    else {
      setLoading(true)
    }
    let v = getDefaultList(param, common)
    setDefVal(v)

  }, [param, data])

  useEffect(() => {
    setCheck_K1(snap['K1'])
    setCheck_N1(snap['N1'])
    setCheck_Z1(snap['Z1'])
    console.log(snap)
    if (defVal && defVal.length > 0) {
      setLoading(false)
    }

  }, [defVal, loading, snap, userrole])

  const final_update = async () => {
    val_update(snap, 'Tech_RMO_ID', userrole['Emp_ID'])
    const time = getDateTime()
    val_update(snap, 'RMO_Dt', time)
    await AsyncStorage.setItem(
      'snapshot', JSON.stringify(snap),
    );
    showToast("success", 'RMO', 'Updated Successfully')

  }

  const db_update = async () => {
    let res = await update_db(snap['IBO_no'], snap)
    if (res.payload == 1) {
      showToast("success", 'RMO', 'Submitted Successfully')
    }
    else {
      showToast("error", 'RMO', 'Please Try Again')
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      {loading ?

        <Loader visible={loading} />
        :

        <ScrollView style={{ width: deviceWidth * 0.95 }}>
          <CommonHeader val={snap} />
          {snap['Tech_RMO_ID'] && snap['RMO_Dt'] ?
            <SubmitHeader val={snap} />
            : null
          }
          <View style={{ marginTop: 0, alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>PNC Stator</Text>

            <TextInput

              underlineColorAndroid={'#ff6666'}
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={PNCData['PNC_Stator']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="0"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'PNC_Stator', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ marginTop: 0, alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>PNC Magnet</Text>

            <TextInput

              underlineColorAndroid={'#ff6666'}
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={PNCData["PNC_Magnet"]}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="0"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'PNC_Magnet', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ marginTop: 0, alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>PNC Control PCB</Text>

            <TextInput

              underlineColorAndroid={'#ff6666'}
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={PNCData['PNC_CP']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="0"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'PNC_CP', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ marginTop: 0, alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>PNC BACK</Text>

            <TextInput

              underlineColorAndroid={'#ff6666'}
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={PNCData['PNC_back']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="0"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'PNC_back', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ marginTop: 0, alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>PNC FRONT</Text>
            <TextInput
              underlineColorAndroid={'#ff6666'}
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={PNCData['PNC_front']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="0"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'PNC_front', value.nativeEvent.text) }}
            />
          </View>
          <View style={{ marginTop: 0, alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>PNC Z Sensor</Text>
            <TextInput
              underlineColorAndroid={'#ff6666'}
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={PNCData['PNC_Zsensor']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="0"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'PNC_Zsensor', value.nativeEvent.text) }}
            />
          </View>
          
          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>K1 Box Lock</Text>

            <View style={{ alignItems: 'flex-start' }}>
              <CheckBox
                center
                size={30}
                checked={check_K1}
                onPress={() => { setCheck_K1(!check_K1); val_update(snap, 'K1', !snap['K1']) }}
              />
            </View>
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>N1 Radial Adjustment</Text>
            
            <View style={{ alignItems: 'flex-start' }}>
              <CheckBox
                center
                size={30}
                checked={check_N1}
                onPress={() => { setCheck_N1(!check_N1); val_update(snap, 'N1', !snap['N1']) }}
              />
            </View>
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Z1 No Error</Text>

            <View style={{ alignItems: 'flex-start' }}>
              <CheckBox
                center
                size={30}
                checked={check_Z1}
                onPress={() => { setCheck_Z1(!check_Z1); val_update(snap, 'Z1', !snap['Z1']) }}
              />
            </View>
          </View>




          {userrole['RMO'] && (
            <View style={styles.Delete}>
              <TouchableOpacity onPress={() => final_update()} style={{ width: deviceWidth * 0.35, height: 40, marginHorizontal: 25, borderRadius: 5, backgroundColor: '#1a1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => db_update()} style={{ width: deviceWidth * 0.35, height: 40, borderRadius: 5, marginHorizontal: 25, backgroundColor: '#ff1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Final Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      }
    </SafeAreaView>
  )



};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  Delete: {
    marginVertical: 20,
    flex: 1,
    flexDirection: 'row',

    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})