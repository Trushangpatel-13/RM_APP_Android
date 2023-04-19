import { MultipleSelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ToastAndroid, RefreshControl } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { BASEURL } from '../../URL';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import { TextInput, IconButton, Colors } from 'react-native-paper';
import { getKeybyValue, getCommonKey, getDefaultList, bool_update, unselected, val_update } from '../../components/func';
import { RMC_BASIC, RMC_BASIC_DATA } from '../../components/form_constant';
import { update_db } from '../../components/APIManager';
import CommonHeader from '../../components/CommonHeader';
import { showToast } from '../../components/Toast';
import Feather from 'react-native-vector-icons/Feather'
import { role_auth } from '../../utilities/RoleAuth';
import { getDateTime } from '../../utilities/DateTime';
import SubmitHeader from '../../components/SubmitHeader';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;



export const RMPScanDetails = ({ navigation }) => {
    let snapshot = ""
    const [userrole, setUserrole] = React.useState({})
    const isFocused = useIsFocused();
    const [selected, setSelected] = React.useState([]);
    const [data, Setdata] = React.useState([])
    const [post, setPost] = React.useState([])
    const [other, setOther] = React.useState({ text_data: '' })

    const [defKey, setDefKey] = React.useState([])
    const [defVal, setDefVal] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [snap, setSnap] = React.useState({})
    const [param, setParam] = React.useState({})

    const [check, setCheck] = React.useState()
    const [refreshing, setRefreshing] = React.useState(false);





    useEffect(() => {
        const getFormData = async () => {
            snapshot = await AsyncStorage.getItem('snapshot');
            setSnap(JSON.parse(snapshot))
            setUserrole(await role_auth())
            setLoading(false)

        }

        getFormData()

    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(async () => {
            getFormData
            setRefreshing(false);
        }, 2000);

        console.log("Snapshot Styring", snapshot)


    }, []);



    const final_update = async () => {
        val_update(snap,'Tech_RMP_ID',userrole['Emp_ID'])
        const time = getDateTime()
        val_update(snap,'RMP_Dt',time)
        await AsyncStorage.setItem(
            'snapshot', JSON.stringify(snap),
        );
        showToast("success",'RMP','Updated Successfully')
    }

    const db_update = async () => {
        
        
        let res = await update_db(snap['IBO_no'], snap)
        console.log("RES", res)
        if (res.payload == 1) {
            showToast("success",'RMP','Submitted Successfully')
        }
        else {
            showToast("error",'RMP','Please Try Again')
        }
    }

    const scan_bc = (field, data_object) => {
        navigation.navigate("ModuleScan", { data_scan: data_object, field_name: field })
    }




    return (
        <SafeAreaView style={styles.container}>

            {loading ?

                <Loader visible={loading} />
                :

                <ScrollView style={{width:deviceWidth*0.94}}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <CommonHeader val={snap} />
                    {snap['Tech_RMP_ID'] && snap['RMP_Dt'] ?
                    <SubmitHeader val={snap}/>
                    :null
                    }
                    <View style={{ marginTop: deviceHeight * 0.03, alignItems: 'flex-start', margin: 5 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Controller</Text>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                            <TextInput
                                editable={userrole['RMP']}
                                underlineColorAndroid={'#ff6666'}
                                disabled={false}
                                defaultValue={snap['Controller_BC']}
                                style={{ marginVertical: deviceHeight * 0.01, color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.65, textAlignVertical: "top", backgroundColor: '#e8e8e8' }}
                                placeholder="Barcode No"
                                keyboardType='numeric'
                                maxLength={100}
                                onEndEditing={(value) => { val_update(snap, 'Controller_BC', value.nativeEvent.text) }}

                            />
                            {userrole['RMP'] &&(
                            <TouchableOpacity onPress={() => scan_bc('Controller_BC', snap)} style={{ marginHorizontal: deviceWidth * 0.05, flex: 1, flexWrap: 'wrap' }}>
                                <Feather
                                    name="camera"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            )}
                        </View>


                    </View>
                    <View style={{ marginTop: deviceHeight * 0.0001, alignItems: 'flex-start', margin: 5 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Inductor Front</Text>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                            <TextInput
                                editable={userrole['RMP']}
                                underlineColorAndroid={'#ff6666'}
                                disabled={false}
                                defaultValue={snap['Inductor_Front_BC']}
                                style={{ marginVertical: deviceHeight * 0.01, color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.65, textAlignVertical: "top", backgroundColor: '#e8e8e8' }}
                                placeholder="Barcode No"
                                keyboardType='numeric'
                                maxLength={100}
                                onEndEditing={(value) => { val_update(snap, 'Inductor_Front_BC', value.nativeEvent.text) }}

                            />
                            {userrole['RMP'] &&(
                            <TouchableOpacity onPress={() => scan_bc('Inductor_Front_BC', snap)} style={{ marginHorizontal: deviceWidth * 0.05, flex: 1, flexWrap: 'wrap' }}>
                                <Feather
                                    name="camera"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            )}
                        </View>


                    </View>

                    <View style={{ marginTop: deviceHeight * 0.0001, alignItems: 'flex-start', margin: 5 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Stator</Text>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                            <TextInput
                                editable={userrole['RMP']}
                                underlineColorAndroid={'#ff6666'}
                                disabled={false}
                                defaultValue={snap['Stator_BC']}
                                style={{ marginVertical: deviceHeight * 0.01, color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.65, textAlignVertical: "top", backgroundColor: '#e8e8e8' }}
                                placeholder="Barcode No"
                                keyboardType='numeric'
                                maxLength={100}
                                onEndEditing={(value) => { val_update(snap, 'Stator_BC', value.nativeEvent.text) }}

                            />
                            {userrole['RMP'] &&(
                            <TouchableOpacity onPress={() => scan_bc('Stator_BC', snap)} style={{ marginHorizontal: deviceWidth * 0.05, flex: 1, flexWrap: 'wrap' }}>
                                <Feather
                                    name="camera"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            )}
                        </View>


                    </View>

                    <View style={{ marginTop: deviceHeight * 0.0001, alignItems: 'flex-start', margin: 5 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Inductor Rear</Text>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                            <TextInput
                                editable={userrole['RMP']}
                                underlineColorAndroid={'#ff6666'}
                                disabled={false}
                                defaultValue={snap['Inductor_Rear_BC']}
                                style={{ marginVertical: deviceHeight * 0.01, color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.65, textAlignVertical: "top", backgroundColor: '#e8e8e8' }}
                                placeholder="Barcode No"
                                keyboardType='numeric'
                                maxLength={100}
                                onEndEditing={(value) => { val_update(snap, 'Inductor_Rear_BC', value.nativeEvent.text) }}

                            />
                            {userrole['RMP'] &&(
                            <TouchableOpacity onPress={() => scan_bc('Inductor_Rear_BC', snap)} style={{ marginHorizontal: deviceWidth * 0.05, flex: 1, flexWrap: 'wrap' }}>
                                <Feather
                                    name="camera"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            )}
                        </View>


                    </View>

                    <View style={{ marginTop: deviceHeight * 0.0001, alignItems: 'flex-start', margin: 5 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Z Sensor</Text>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                            <TextInput
                                editable={userrole['RMP']}
                                underlineColorAndroid={'#ff6666'}
                                disabled={false}
                                defaultValue={snap['Z_Sensor']}
                                style={{ marginVertical: deviceHeight * 0.01, color: 'black', fontWeight: 'bold', fontSize: 15, width: deviceWidth * 0.65, textAlignVertical: "top", backgroundColor: '#e8e8e8' }}
                                placeholder="Barcode No"
                                keyboardType='numeric'
                                maxLength={100}
                                onEndEditing={(value) => { val_update(snap, 'Z_Sensor', value.nativeEvent.text) }}

                            />
                            {userrole['RMP'] &&(
                            <TouchableOpacity onPress={() => scan_bc('Z_Sensor', snap)} style={{ marginHorizontal: deviceWidth * 0.05, flex: 1, flexWrap: 'wrap' }}>
                                <Feather
                                    name="camera"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            )}
                        </View>


                    </View>







                    
                    {userrole['RMP'] && !userrole['Submit'] ?
                    <View style={styles.Delete}>
                        <TouchableOpacity onPress={() => final_update()} style={{ width: deviceWidth * 0.35, height: 40, marginHorizontal: 25, borderRadius: 5, backgroundColor: '#1a1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => db_update()} style={{ width: deviceWidth * 0.35, height: 40, borderRadius: 5, marginHorizontal: 25, backgroundColor: '#ff1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Final Submit</Text>
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