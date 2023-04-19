import React, { Component, Fragment } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView,TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler, Dimensions, StyleSheet,} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Feather from 'react-native-vector-icons/Feather'
import styles from '../scanStyle';
import COLORS from '../conts/colors';
import { val_update } from './func';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
class ModuleScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: true,
            ScanResult: false,
            result: null,
            data: this.props.route.params.data_scan,
            field: this.props.route.params.field_name,
            loading: true
        };
    }
    onSuccess = async (e) => {
        //const check = e.data;

        //console.log('scanned data' + check);
        this.setState({
            result: e.data,
            scan: false,
            ScanResult: true,
            loading: false
        })
        


    }


    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false, loading: true })
    }
    sendData = async () => {
        
        let data = this.state.result;
        
        await val_update(this.state.data, this.state.field, data)

        data = this.state.data
        await AsyncStorage.setItem(
            'snapshot',
            JSON.stringify(data),
        );
        console.log("Snap", data)
        
        

        this.props.navigation.goBack()
    }
    render() {
        const { scan, ScanResult, result, loading } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Feather name="arrow-left" size={30} color='black' />
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>{result}</Text>

                    </View>

                    
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            cameraStyle={styles.CameraStyle}
                            bottomContent={
                                <View style={styles.bottomContent}>
                                    <TouchableOpacity style={styles.buttonScan2}
                                            /*onPress={() => this.scanner.reactivate()} 
                                            onLongPress={() => this.setState({ scan: false })}
                                            */onPress={() => this.onSuccess()}
                                        onLongPress={() => this.onSuccess}
                                    >
                                        <View style={{ alignItems: 'center', marginTop: deviceHeight * 0.03, height: 45, backgroundColor: 'white', borderRadius: 15, borderColor: 'black', borderWidth: 1 }}>
                                            <Feather
                                                name="camera"
                                                size={40}
                                                color="black"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }

                        />
                    
                    <View>
                        <View style={Styles.Delete}>
                            <TouchableOpacity onPress={() => this.scanAgain()} style={{ width: deviceWidth * 0.35, height: 40, marginHorizontal: 25, borderRadius: 5, backgroundColor: '#1a1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white' }}>Scan Again</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.sendData()} style={{ width: deviceWidth * 0.35, height: 40, borderRadius: 5, marginHorizontal: 25, backgroundColor: '#ff1a1a', alignContent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Fragment>
            </View>
        );
    }
}
export default ModuleScan;

const Styles = StyleSheet.create({

    Delete: {
        flex: 1,
        flexDirection: 'row',

        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50
    }
});