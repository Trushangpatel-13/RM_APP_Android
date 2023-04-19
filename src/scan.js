import React, { Component, Fragment } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Feather from 'react-native-vector-icons/Feather'
import styles from './scanStyle';
import COLORS from './conts/colors';
class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: true,
            ScanResult: false,
            result: null
        };
    }
    onSuccess = (e) => {
        //const check = e.data;
        
        //console.log('scanned data' + check);
        this.setState({
            result: e.data,
            scan: false,
            ScanResult: true
        })
        
        
    }

    
    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }
    sendData = async () =>{
        let data = this.state.result;
        let UserData = await AsyncStorage.getItem('userData');
        User = JSON.parse(UserData).Employee_ID
        AsyncStorage.setItem(
            'IBOData',
            JSON.stringify({IBONo: data,Emp_ID:User}),
          );
        
    
        
        this.props.navigation.navigate("HomeScreen")
    }
    render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("HomeScreen")}>
                            <Feather name="arrow-left" size={30} color='black' />
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Scan QR Code</Text>
                    </View>
                    {ScanResult &&
                        <Fragment>
                            
                            <Text style={styles.textTitle1}>Data</Text>
                            <Text style={styles.textTitle1}>{this.state.result}</Text>
                            <View style={{alignItems:'center'}}>
                            <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                    
                                        <Text style={{...styles.buttonTextStyle, color: COLORS.black, fontSize:20}}>Scan Again</Text>
                                    </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.sendData} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        
                                        <Text style={{...styles.buttonTextStyle, color: COLORS.black, fontSize:25}}>OK</Text>
                                    </View>
                            </TouchableOpacity>
                            </View>
                        </Fragment>
                    }
                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            cameraStyle={styles.CameraStyle}

                            bottomContent={
                                <View>
                                    <ImageBackground source={require('./assets/bottom-panel.png')} style={styles.bottomContent}>
                                        <TouchableOpacity style={styles.buttonScan2} 
                                            /*onPress={() => this.scanner.reactivate()} 
                                            onLongPress={() => this.setState({ scan: false })}
                                            */onPress={() => this.onSuccess()}
                                            onLongPress={() => this.onSuccess}
                                            >
                                            <Image source={require('./assets/camera2.png')}></Image>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    

                                    
                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>
        );
    }
}
export default Scan;