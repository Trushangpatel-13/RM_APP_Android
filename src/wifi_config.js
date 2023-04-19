import WifiManager from "react-native-wifi-reborn";
import React, {Component} from 'react';
import {View, StyleSheet, Button, Alert, PermissionsAndroid} from 'react-native';


const Wifi_config = () => {
    const [wifilist, setWifilist] = React.useState([]);
    const [currrentSSID, setCurrentSSID] = React.useState();
    React.useEffect (() => {
        permission();
        getWifilist();
}, []);
const getWifilist = () => {
wifiReborn.getCurrentWifiSSID().then(ssid=> setCurrentSSID (ssid));
};
    const permission = async () => {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
        title: 'Location permission is required for WiFi connections',
        message:
        'This app needs location permission as this is required' + 
        'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
        },
        );
        if (granted === PermissionsAndroid. RESULTS.GRANTED) {
        // You can now use react-native-wifi-reborn
        console.log("Granted");
        } else {
        console.log("Not Granted");
        }
    };

    return(
        <View style={{flex: 1, margin: 20}}>
        <Text
        style={{
        fontSize: 28,
        color: 'green',
        textAlign: 'center',
    }}>
        {currrentSSID}
        </Text>
    </View>
    );
}
export default Wifi_config; 