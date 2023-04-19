import { MultipleSelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';


import Loader from '../../components/Loader';
 
import { getKeybyValue, getCommonKey, getDefaultList, bool_update, unselected, val_update, isEmpty } from '../../components/func';
import { RMS_B, RMS_B_DATA, RMS_RFM, RMS_RFM_DATA, RMP_RMS, RMP_RMS_DATA } from '../../components/form_constant';
import { update_db } from '../../components/APIManager';
import CommonHeader from '../../components/CommonHeader';
import { showToast } from '../../components/Toast';
import { role_auth } from '../../utilities/RoleAuth';
import { getDateTime } from '../../utilities/DateTime';
import SubmitHeader from '../../components/SubmitHeader';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const parameter = ['RMO_IF', 'RMO_STATOR']

export const RMSBasicDetails = () => {
  let common = {}
  const [userrole, setUserrole] = React.useState({})
  const [data_RFM, Setdata_RFM] = React.useState([])
  const [data_B, Setdata_B] = React.useState([])
  const [data_RMP_RMS, Setdata_RMP_RMS] = React.useState([])

  const [param_RFM, setParam_RFM] = React.useState({})
  const [param_B, setParam_B] = React.useState({})
  const [param_RMP_RMS, setParam_RMP_RMS] = React.useState({})

  const [selected_RFM, setSelected_RFM] = React.useState([]);
  const [selected_B, setSelected_B] = React.useState([]);
  const [selected_RMP_RMS, setSelected_RMP_RMS] = React.useState([]);

  const [defVal_RFM, setDefVal_RFM] = React.useState([])
  const [defVal_B, setDefVal_B] = React.useState([])
  const [defVal_RMP_RMS, setDefVal_RMP_RMS] = React.useState([])

  const [loading_RFM, setLoading_RFM] = React.useState(true)
  const [loading_B, setLoading_B] = React.useState(true)
  const [loading_RMP_RMS, setLoading_RMP_RMS] = React.useState(true)

  const [snap, setSnap] = React.useState({})



  useEffect(() => {
    getFormData = async () => {
      let snapshot = await AsyncStorage.getItem('snapshot');
      setSnap(JSON.parse(snapshot))
      Setdata_RFM(RMS_RFM_DATA)
      setParam_RFM(RMS_RFM)
      Setdata_B(RMS_B_DATA)
      setParam_B(RMS_B)

      Setdata_RMP_RMS(RMP_RMS_DATA)
      setParam_RMP_RMS(RMP_RMS)
      setUserrole(await role_auth())





    }
    getFormData()



  }, [])

  useEffect(() => {
    let common = []
    let v = []
    console.log('User Role',userrole)
    common = getKeybyValue(snap, 1, Object.keys(param_RFM))
    setSelected_RFM(common)
    if (common.length == 0) {
      setLoading_RFM(false)
    }
    else {
      setLoading_RFM(true)
    }
    v = getDefaultList(param_RFM, common)
    setDefVal_RFM(v)

    common = getKeybyValue(snap, 1, Object.keys(param_B))
    setSelected_B(common)
    if (common.length == 0) {
      setLoading_B(false)
    }
    else {
      setLoading_B(true)
    }
    v = getDefaultList(param_B, common)
    setDefVal_B(v)

    common = getKeybyValue(snap, 1, Object.keys(param_RMP_RMS))
    setSelected_RMP_RMS(common)
    if (common.length == 0) {
      setLoading_RMP_RMS(false)
    }
    else {
      setLoading_RMP_RMS(true)
    }
    v = getDefaultList(param_RMP_RMS, common)
    setDefVal_RMP_RMS(v)



  }, [param_RFM, data_RFM, param_B, data_B, param_RMP_RMS, data_RMP_RMS, userrole])

  useEffect(() => {
    if (defVal_RFM && defVal_RFM.length > 0) {
      setLoading_RFM(false)
    }

    if (defVal_B && defVal_B.length > 0) {
      setLoading_B(false)
    }

    if (defVal_RMP_RMS && defVal_RMP_RMS.length > 0) {
      setLoading_RMP_RMS(false)
    }


  }, [defVal_RFM, loading_RFM, defVal_B, loading_B, defVal_RMP_RMS, loading_RMP_RMS])








  const dropdown_update = async () => {

    let uncommon = []
    uncommon = unselected(Object.keys(param_RFM), selected_RFM)
    bool_update(snap, selected_RFM, 1)
    bool_update(snap, uncommon, 0)

    uncommon = unselected(Object.keys(param_B), selected_B)
    bool_update(snap, selected_B, 1)
    bool_update(snap, uncommon, 0)

    uncommon = unselected(Object.keys(param_RMP_RMS), selected_RMP_RMS)
    bool_update(snap, selected_RMP_RMS, 1)
    bool_update(snap, uncommon, 0)


    val_update(snap, 'Tech_RMS_ID', userrole['Emp_ID'])
    const time = getDateTime()
    val_update(snap, 'RMS_Dt', time)
    val_update(snap, 'Complete_dt', time)
    await AsyncStorage.setItem(
      'snapshot', JSON.stringify(snap),
    );
    showToast("success", 'RMS', 'Updated Successfully')
  }

  const db_update = async () => {
    let res = await update_db(snap['IBO_no'], snap)
    
    if (res.payload == 1) {
      showToast("success", 'RMS', 'Submitted Successfully')
    }
    else {
      showToast("error", 'RMS', 'Please Try Again')
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      {loading_RFM ?

        <Loader visible={loading_RFM} />
        :

        <ScrollView>
          <CommonHeader val={snap} />
          {snap['Tech_RMS_ID'] && snap['RMS_Dt'] ?
            <SubmitHeader val={snap} />
            : null
          }
          <View style={{ marginTop: 20, marginVertical: 10 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Resonance Freq Measure</Text>
            <MultipleSelectList
              seedSelectedVals={defVal_RFM}
              maxHeight={deviceHeight * 0.60}
              boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 20, fontSize: 50 }}
              dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
              placeholder="Select Details"
              dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
              setSelected={(val) => setSelected_RFM(val)}
              data={data_RFM}
              save="key"
              checkBoxStyles={{ fontSize: 20, color: 'white' }}
            />
          </View>
          {loading_B ? null :
            <View style={{ marginVertical: 5 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Bearing Stiffness</Text>
              <MultipleSelectList
                seedSelectedVals={defVal_B}
                maxHeight={deviceHeight * 0.60}
                boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 10, fontSize: 50 }}
                dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
                placeholder="Select Details"
                dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
                setSelected={(val) => setSelected_B(val)}
                data={data_B}
                save="key"
                checkBoxStyles={{ fontSize: 20, color: 'white' }}
              />

            </View>
          }

          {loading_RMP_RMS ? null :
            <View style={{ marginVertical: 5 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Ctrl Board Defective</Text>
              <MultipleSelectList
                seedSelectedVals={defVal_RMP_RMS}
                maxHeight={deviceHeight * 0.60}
                boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 10, fontSize: 50 }}
                dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
                placeholder="Select Details"
                dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
                setSelected={(val) => setSelected_RMP_RMS(val)}
                data={data_RMP_RMS}
                save="key"
                checkBoxStyles={{ fontSize: 20, color: 'white' }}
              />

            </View>
          }

          {userrole['RMS'] && !userrole['Submit'] ?
            <View style={styles.Delete}>
              <TouchableOpacity onPress={() => dropdown_update()} style={{ width: deviceWidth * 0.35, height: 40, marginHorizontal: 25, borderRadius: 5, backgroundColor: '#1a1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => db_update()} style={{ width: deviceWidth * 0.35, height: 40, borderRadius: 5, marginHorizontal: 25, backgroundColor: '#ff1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Final Submit</Text>
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