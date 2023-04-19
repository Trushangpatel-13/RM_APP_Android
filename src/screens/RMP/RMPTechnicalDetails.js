import { MultipleSelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl } from 'react-native';
import axios from 'axios';
import { BASEURL } from '../../URL';
import Loader from '../../components/Loader';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import { getKeybyValue, getCommonKey, getDefaultList, bool_update, unselected, val_update } from '../../components/func';
import { RMP_TECH, RMP_TECH_DATA } from '../../components/form_constant';
import { update_db } from '../../components/APIManager';
import CommonHeader from '../../components/CommonHeader';
import { showToast } from '../../components/Toast';
import { role_auth } from '../../utilities/RoleAuth';
import SubmitHeader from '../../components/SubmitHeader';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;



export const RMPTechnicalDetails = () => {
  const [userrole, setUserrole] = React.useState({})
  const [selected, setSelected] = React.useState([]);
  const [data, Setdata] = React.useState([])
  const [post, setPost] = React.useState([])
  const [other, setOther] = React.useState({ text_data: '' })

  const [defKey, setDefKey] = React.useState([])
  const [defVal, setDefVal] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [snap, setSnap] = React.useState({})
  const [param, setParam] = React.useState({})

  useEffect(() => {
    getFormData = async () => {
      let snapshot = await AsyncStorage.getItem('snapshot');
      setSnap(JSON.parse(snapshot))
      Setdata(RMP_TECH_DATA)
      setParam(RMP_TECH)
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
    console.log(userrole)

  }, [param, data, userrole])

  useEffect(() => {
    if (defVal && defVal.length > 0) {
      setLoading(false)
    }
  }, [defVal, loading])



  const dropdown_update = async () => {

    let uncommon = unselected(Object.keys(param), selected)
    bool_update(snap, selected, 1)
    bool_update(snap, uncommon, 0)

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
        <ScrollView>
          <CommonHeader val={snap} />
          {snap['Tech_RMP_ID'] && snap['RMP_Dt'] ?
            <SubmitHeader val={snap} />
            : null
          }
          <MultipleSelectList
            seedSelectedVals={defVal}
            maxHeight={deviceHeight * 0.60}
            boxStyles={{ width: deviceWidth * 0.94, borderColor: 'black', marginTop: 30, fontSize: 50 }}
            dropdownStyles={{ width: deviceWidth * 0.94, borderColor: 'black', backgroundColor: '#e8e8e8', fontSize: 20, marginVertical: 5 }}
            placeholder="Select Details"
            dropdownTextStyles={{ fontSize: 18, fontWeight: 700, color: 'black' }}
            setSelected={(val) => setSelected(val)}
            data={data}
            save="key"
            label="RMK - WSC"
            labelStyles={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}
            checkBoxStyles={{ fontSize: 20, color: 'white' }}
          />

          {userrole['RMP'] && !userrole['Submit'] ?
            <View style={styles.Delete}>
              <TouchableOpacity onPress={() => dropdown_update()} style={{ width: deviceWidth * 0.35, height: 40, marginHorizontal: 25, borderRadius: 5, backgroundColor: '#1a1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
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