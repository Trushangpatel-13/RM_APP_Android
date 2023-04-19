import { MultipleSelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import Loader from '../../components/Loader';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import { getKeybyValue, getCommonKey, getDefaultList, bool_update, unselected, val_update, isEmpty } from '../../components/func';
import { RMO_IF, RMO_IF_DATA, RMO_STATOR, RMO_STATOR_DATA, RMO_IR, RMO_IR_DATA, RMO_Z, RMO_Z_DATA, RMO_STATOR_OUTSIDE, RMO_STATOR_OUTSIDE_DATA } from '../../components/form_constant';
import { update_db } from '../../components/APIManager';
import CommonHeader from '../../components/CommonHeader';
import { showToast } from '../../components/Toast';
import { role_auth } from '../../utilities/RoleAuth';
import SubmitHeader from '../../components/SubmitHeader';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const parameter = ['RMO_IF', 'RMO_STATOR']

export const RMOBasicDetails = () => {
  let common = {}
  const [userrole, setUserrole] = React.useState({})
  const [data_IF, Setdata_IF] = React.useState([])
  const [data_S, Setdata_S] = React.useState([])
  const [data_IR, Setdata_IR] = React.useState([])
  const [data_Z, Setdata_Z] = React.useState([])
  const [data_SO, Setdata_SO] = React.useState([])

  const [param_IF, setParam_IF] = React.useState({})
  const [param_S, setParam_S] = React.useState({})
  const [param_IR, setParam_IR] = React.useState({})
  const [param_Z, setParam_Z] = React.useState({})
  const [param_SO, setParam_SO] = React.useState({})

  const [selected_IF, setSelected_IF] = React.useState([]);
  const [selected_S, setSelected_S] = React.useState([]);
  const [selected_IR, setSelected_IR] = React.useState([]);
  const [selected_Z, setSelected_Z] = React.useState([]);
  const [selected_SO, setSelected_SO] = React.useState([]);

  const [defVal_IF, setDefVal_IF] = React.useState([])
  const [defVal_S, setDefVal_S] = React.useState([])
  const [defVal_IR, setDefVal_IR] = React.useState([])
  const [defVal_Z, setDefVal_Z] = React.useState([])
  const [defVal_SO, setDefVal_SO] = React.useState([])

  const [loading_IF, setLoading_IF] = React.useState(true)
  const [loading_S, setLoading_S] = React.useState(true)
  const [loading_IR, setLoading_IR] = React.useState(true)
  const [loading_Z, setLoading_Z] = React.useState(true)
  const [loading_SO, setLoading_SO] = React.useState(true)

  const [snap, setSnap] = React.useState({})



  useEffect(() => {
    getFormData = async () => {
      let snapshot = await AsyncStorage.getItem('snapshot');
      setSnap(JSON.parse(snapshot))
      Setdata_IF(RMO_IF_DATA)
      setParam_IF(RMO_IF)

      Setdata_S(RMO_STATOR_DATA)
      setParam_S(RMO_STATOR)

      Setdata_IR(RMO_IR_DATA)
      setParam_IR(RMO_IR)

      Setdata_Z(RMO_Z_DATA)
      setParam_Z(RMO_Z)

      Setdata_SO(RMO_STATOR_OUTSIDE_DATA)
      setParam_SO(RMO_STATOR_OUTSIDE)
      setUserrole(await role_auth())


    }
    getFormData()



  }, [])

  useEffect(() => {
    let common = []
    let v = []

    common = getKeybyValue(snap, 1, Object.keys(param_IF))
    setSelected_IF(common)
    if (common.length == 0) {
      setLoading_IF(false)
    }
    else {
      setLoading_IF(true)
    }
    v = getDefaultList(param_IF, common)
    setDefVal_IF(v)

    common = getKeybyValue(snap, 1, Object.keys(param_S))
    setSelected_S(common)
    if (common.length == 0) {
      setLoading_S(false)
    }
    else {
      setLoading_S(true)
    }
    v = getDefaultList(param_S, common)
    setDefVal_S(v)

    common = getKeybyValue(snap, 1, Object.keys(param_IR))
    setSelected_IR(common)
    if (common.length == 0) {
      setLoading_IR(false)
    }
    else {
      setLoading_IR(true)
    }
    v = getDefaultList(param_IR, common)
    setDefVal_IR(v)

    common = getKeybyValue(snap, 1, Object.keys(param_Z))
    setSelected_Z(common)
    if (common.length == 0) {
      setLoading_Z(false)
    }
    else {
      setLoading_Z(true)
    }
    v = getDefaultList(param_Z, common)
    setDefVal_Z(v)

    common = getKeybyValue(snap, 1, Object.keys(param_SO))
    setSelected_SO(common)
    if (common.length == 0) {
      setLoading_SO(false)
    }
    else {
      setLoading_SO(true)
    }
    v = getDefaultList(param_SO, common)
    setDefVal_SO(v)
    console.log(userrole)


  }, [param_IF, data_IF, param_S, data_S, param_IR, data_IR, param_Z, data_Z, userrole, param_SO, data_SO])

  useEffect(() => {
    if (defVal_IF && defVal_IF.length > 0) {
      setLoading_IF(false)
    }

    if (defVal_S && defVal_S.length > 0) {
      setLoading_S(false)
    }

    if (defVal_IR && defVal_IR.length > 0) {
      setLoading_IR(false)
    }

    if (defVal_Z && defVal_Z.length > 0) {
      setLoading_Z(false)
    }

    if (defVal_SO && defVal_SO.length > 0) {
      setLoading_SO(false)
    }
  }, [defVal_IF, loading_IF, defVal_S, loading_S, defVal_IR, loading_IR, defVal_Z, loading_Z, defVal_SO, loading_SO])








  const dropdown_update = async () => {

    let uncommon = []
    uncommon = unselected(Object.keys(param_IF), selected_IF)
    bool_update(snap, selected_IF, 1)
    bool_update(snap, uncommon, 0)

    uncommon = unselected(Object.keys(param_S), selected_S)
    bool_update(snap, selected_S, 1)
    bool_update(snap, uncommon, 0)

    uncommon = unselected(Object.keys(param_IR), selected_IR)
    bool_update(snap, selected_IR, 1)
    bool_update(snap, uncommon, 0)

    uncommon = unselected(Object.keys(param_Z), selected_Z)
    bool_update(snap, selected_Z, 1)
    bool_update(snap, uncommon, 0)

    uncommon = unselected(Object.keys(param_SO), selected_SO)
    bool_update(snap, selected_SO, 1)
    bool_update(snap, uncommon, 0)

    await AsyncStorage.setItem(
      'snapshot', JSON.stringify(snap),
    );
    showToast("success", 'RMO', 'Updated Successfully')
  }

  const db_update = async () => {
    let res = await update_db(snap['IBO_no'], snap)
    console.log("RES", res)
    if (res.payload == 1) {
      showToast("success", 'RMO', 'Submitted Successfully')
    }
    else {
      showToast("error", 'RMO', 'Please Try Again')
    }
  }


  return (
    <SafeAreaView style={styles.container}>


      {loading_IF ?

        <Loader visible={loading_IF} />
        :

        <ScrollView>
          <CommonHeader val={snap} />
          {snap['Tech_RMO_ID'] && snap['RMO_Dt'] ?
            <SubmitHeader val={snap} />
            : null
          }
          <View style={{ flex: 1, flexDirection: 'row', height: deviceHeight * 0.05, width: deviceWidth * 0.9, alignItems: 'center', marginTop: deviceHeight * 0.04 }}>
            <Text style={{ flex: 1, color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Stator : Week</Text>

            <TextInput
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={snap['Stator_Week']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.15, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginRight: deviceWidth * 0.05 }}
              placeholder="00"
              keyboardType='numeric'
              onEndEditing={(value) => { val_update(snap, 'Stator_Week', value.nativeEvent.text) }}

            />
            <Text style={{ color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Year</Text>

            <TextInput
              editable={userrole['RMO'] && !userrole['Submit']}
              defaultValue={snap['Stator_Year']}
              style={{ flexcolor: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.20, textAlignVertical: "top", backgroundColor: '#e8e8e8', marginHorizontal: deviceWidth * 0.05 }}
              placeholder="0000"
              keyboardType='numeric'
              onEndEditing={(value) => { val_update(snap, 'Stator_Year', value.nativeEvent.text) }}

            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>Inductor Front</Text>
            <MultipleSelectList
              seedSelectedVals={defVal_IF}
              maxHeight={deviceHeight * 0.60}
              boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 20, fontSize: 50 }}
              dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
              placeholder="Select Details"
              dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
              setSelected={(val) => setSelected_IF(val)}
              data={data_IF}
              save="key"
              checkBoxStyles={{ fontSize: 20, color: 'white' }}
            />
          </View>
          {loading_S ? null :
            <View style={{ marginVertical: 10 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>Stator</Text>
              <MultipleSelectList
                seedSelectedVals={defVal_S}
                maxHeight={deviceHeight * 0.60}
                boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 10, fontSize: 50 }}
                dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
                placeholder="Select Details"
                dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
                setSelected={(val) => setSelected_S(val)}
                data={data_S}
                save="key"
                checkBoxStyles={{ fontSize: 20, color: 'white' }}
              />
            </View>
          }

          {loading_IR ? null :
            <View style={{ marginVertical: 10 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>Inductor Rear</Text>
              <MultipleSelectList
                seedSelectedVals={defVal_IR}
                maxHeight={deviceHeight * 0.60}
                boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 10, fontSize: 50 }}
                dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
                placeholder="Select Details"
                dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
                setSelected={(val) => setSelected_IR(val)}
                data={data_IR}
                save="key"
                checkBoxStyles={{ fontSize: 20, color: 'white' }}
              />
            </View>
          }

          {loading_Z ? null :
            <View style={{ marginVertical: 15 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>Z Sensor</Text>
              <MultipleSelectList
                seedSelectedVals={defVal_Z}
                maxHeight={deviceHeight * 0.60}
                boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 10, fontSize: 50 }}
                dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
                placeholder="Select Details"
                dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
                setSelected={(val) => setSelected_Z(val)}
                data={data_Z}
                save="key"
                checkBoxStyles={{ fontSize: 20, color: 'white' }}
              />
            </View>
          }

          {loading_SO ? null :
            <View style={{ marginVertical: 15 }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }}>Stator Outside</Text>
              <MultipleSelectList
                seedSelectedVals={defVal_SO}
                maxHeight={deviceHeight * 0.60}
                boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 10, fontSize: 50 }}
                dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
                placeholder="Select Details"
                dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
                setSelected={(val) => setSelected_SO(val)}
                data={data_SO}
                save="key"
                checkBoxStyles={{ fontSize: 20, color: 'white' }}
              />
            </View>
          }
          {userrole['RMO'] && !userrole['Submit'] ?
            <View style={styles.Delete}>
              <TouchableOpacity onPress={() => dropdown_update()} style={{ width: deviceWidth * 0.35, height: 40, marginHorizontal: 25, borderRadius: 5, backgroundColor: '#1a1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => db_update()} style={{ width: deviceWidth * 0.35, height: 40, borderRadius: 5, marginHorizontal: 25, backgroundColor: '#ff1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          :null}
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