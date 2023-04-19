import { MultipleSelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
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



//const fields_key = ["A1","A2","A3","A4","Oil_Flude","Water_Humid","Dust_Dirt","Fiber_Microdust","packing_not_ok","Air_connector_stuffy","Air_hose_remains","Airfilter_broken","with_swap_cable","Missing_Screw"]

export const RMCBasicDetails = () => {
  const [userrole, setUserrole] = React.useState({})
  const [selected, setSelected] = React.useState([]);
  const [data, Setdata] = React.useState([])
  const [post, setPost] = React.useState([])
  const [other, setOther] = React.useState("")

  const [defKey, setDefKey] = React.useState([])
  const [defVal, setDefVal] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [snap, setSnap] = React.useState({})
  const [param, setParam] = React.useState({})

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
    console.log(userrole)
  }, [param, data, userrole])

  useEffect(() => {
    if (defVal && defVal.length > 0) {
      setLoading(false)

    }
  }, [defVal, loading])

  const handlesubmit = (value) => {
    setOther(value.nativeEvent.text);
  }

  const dropdown_update = async () => {

    let uncommon = unselected(Object.keys(param), selected)
    bool_update(snap, selected, 1)
    bool_update(snap, uncommon, 0)
    if (other == "") {
      val_update(snap, 'other_detail', snap['other_detail'])
    } else {
      val_update(snap, 'other_detail', other)
    }
    val_update(snap, 'Tech_RMC_ID', userrole['Emp_ID'])
    const time = getDateTime()
    val_update(snap, 'RMC_Dt', time)
    await AsyncStorage.setItem(
      'snapshot', JSON.stringify(snap),
    );
    showToast("success", 'RMC', 'Updated Successfully')
  }

  const db_update = async () => {

    //val_update(snap,'RMC_Dt',)
    let res = await update_db(snap['IBO_no'], snap)
    if (res.payload == 1) {
      showToast("success", 'RMC', 'Submitted Successfully')
    }
    else {
      showToast("error", 'RMC', 'Please Try Again')
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      {loading ?

        <Loader visible={loading} />
        :

        <ScrollView>
          <CommonHeader val={snap} />
          {snap['Tech_RMC_ID'] && snap['RMC_Dt'] ?
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
          <View style={{ marginTop: 20, alignItems: 'center', textAlign: 'left', textAlign: 'left' }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 700, textAlign: 'left', marginBottom: 10 }}>Comments</Text>

            <TextInput

              editable={userrole['RMC'] && !userrole['Submit']}
              defaultValue={snap['other_detail']}
              style={{ color: 'black', fontWeight: 'bold', fontSize: 18, width: deviceWidth * 0.90, textAlignVertical: "top", backgroundColor: '#e8e8e8' }}
              placeholder="Enter Other Comments"
              multiline={true}
              numberOfLines={4}
              maxLength={100}
              onEndEditing={(value) => { handlesubmit(value) }}

            />
          </View>
          {userrole['RMC'] && !userrole['Submit'] ?
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