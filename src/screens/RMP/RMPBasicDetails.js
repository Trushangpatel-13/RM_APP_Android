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
import { getDate, getDateTime } from '../../utilities/DateTime';
import SubmitHeader from '../../components/SubmitHeader';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;



export const RMPBasicDetails = () => {
  const [userrole, setUserrole] = React.useState({})
  const [selected, setSelected] = React.useState([])
  const [data, Setdata] = React.useState([])

  const [defVal, setDefVal] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [snap, setSnap] = React.useState({})
  const [param, setParam] = React.useState({})

  const [check, setCheck] = React.useState()


  useEffect(() => {
    getFormData = async () => {
      let snapshot = await AsyncStorage.getItem('snapshot');
      setSnap(JSON.parse(snapshot))
      Setdata(RMC_BASIC_DATA)
      setParam(RMC_BASIC)
      setUserrole(await role_auth())

    }
    getFormData()



  }, [])

  useEffect(() => {

    let common = getKeybyValue(snap, 1, Object.keys(param))
    setSelected(common)
    console.log("Value", common)

    if (common.length == 0) {
      setLoading(false)
    }
    else {
      setLoading(true)
    }
    let v = getDefaultList(param, common)
    setDefVal(v)

  }, [param, data, userrole])

  useEffect(() => {
    setCheck(snap['C3'])
    console.log("Check", check)
    if (defVal && defVal.length > 0) {
      setLoading(false)
      console.log(userrole)
    }
  }, [defVal, loading])

  const final_update = async () => {
    await AsyncStorage.setItem(
      'snapshot', JSON.stringify(snap),
    );
    showToast("success", 'RMP', 'Updated Successfully')

  }

  const db_update = async () => {
    let res = await update_db(snap['IBO_no'], snap)
    console.log("RES", res)
    if (res.payload == 1) {
      showToast("success", 'RMP', 'Submitted Successfully')
    }
    else {
      showToast("error", 'RMP', 'Please Try Again')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ?

        <Loader visible={loading} />
        :

        <ScrollView style={{ width: deviceWidth * 0.95 }}>
          <CommonHeader val={snap} />
          {snap['Tech_RMP_ID'] && snap['RMP_Dt'] ?
            <SubmitHeader val={snap} />
            : null
          }
          <View style={{ marginTop: 10, alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Last Working Hours</Text>

            <TextInput

              underlineColorAndroid={'#ff6666'}
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Last_working_Hour']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Hours"
              keyboardType='numeric'
              maxLength={100}
              onEndEditing={(value) => { val_update(snap, 'Last_working_Hour', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Working Hours</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Working_Hours']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Hours"
              keyboardType='numeric'
              maxLength={100}
              onEndEditing={(value) => { val_update(snap, 'Working_Hours', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Damage Date</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Damage_Date']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Damage Date"
              onEndEditing={(value) => { val_update(snap, 'Damage_Date', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Repair Date</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Repair_Date']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Repair Date"
              onEndEditing={(value) => { val_update(snap, 'Repair_Date', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Error Code from Customer</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Err_Code_customer']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Last Error Code"
              maxLength={30}
              onEndEditing={(value) => { val_update(snap, 'Err_Code_customer', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Last Error Code</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Err_1']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Error Code 1"
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'Err_1', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Error Code Max</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Err_2']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Error Code 2"
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'Err_2', value.nativeEvent.text) }}


            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Error Code 2nd Max</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Err_3']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Error Code 3"
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'Err_3', value.nativeEvent.text) }}


            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>RM Speed      (in k)</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['RM_Speed']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="RM Speed"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'RM_Speed', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Rotor Dia        (in mm)</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Rotor_Dia']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Rotor Dia"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'Rotor_Dia', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Spindle No</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Spindle_No']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Spindle No"
              maxLength={5}
              onEndEditing={(value) => { val_update(snap, 'Spindle_No', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Cont Hrd Ver IN</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Controller_ver_in']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Hrd Ver IN"

              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'Controller_ver_in', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Cont Hrd Ver OUT</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['Controller_ver_Out']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="Hrd Ver OUT"
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'Controller_ver_Out', value.nativeEvent.text) }}


            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>C1 Rear</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['C1']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="C1 Rear"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'C1', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>C2 Front</Text>

            <TextInput
              editable={userrole['RMP'] && !userrole['Submit']}
              defaultValue={snap['C2']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.60, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: 15 }}
              placeholder="C2 Front"
              keyboardType='numeric'
              maxLength={10}
              onEndEditing={(value) => { val_update(snap, 'C2', value.nativeEvent.text) }}

            />
          </View>



          <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', height: deviceWidth * 0.2, alignItems: 'center' }}>
            <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>C3 No Liftup</Text>

            <View style={{ alignItems: 'flex-start' }}>
              <CheckBox
                center
                size={30}
                checked={check}
                onPress={() => { setCheck(!check); val_update(snap, 'C3', !snap['C3']) }}
              />
            </View>
          </View>




          {userrole['RMP'] && !userrole['Submit'] ?
            <View style={styles.Delete}>


              <TouchableOpacity onPress={() => final_update()} style={{ width: deviceWidth * 0.35, height: 40, marginHorizontal: 25, borderRadius: 5, backgroundColor: '#1a1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => db_update()} style={{ width: deviceWidth * 0.35, height: 40, borderRadius: 5, marginHorizontal: 25, backgroundColor: '#ff1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>


            : null}

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