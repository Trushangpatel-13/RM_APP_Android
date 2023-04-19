//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
// create a component
const CheckConnetion = ({ isConnected, setIsConnected }) => {
    useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            //console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected);

        });

        /*
        return () => {    // Unsubscribe
            unsubscribe();
        };*/
    }, []);
    const checkConnection = () => {
        NetInfo.fetch().then(state => {
            //console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected);
        });
        
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/no_connection.png')}
                style={styles.image}
            />
            <Text style={styles.message}>{isConnected == true ? 'WiFi Connected' : 'No WiFi Connection'}</Text>
            <TouchableOpacity style={styles.refresh} onPress={() => {
                checkConnection();
            }}>
                <Text style={styles.txt}>
                    Reload
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default CheckConnetion
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',

    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 200
    },
    message: {
        fontSize: 25,
        color: 'red',
        alignSelf: 'center',
        marginTop: 20
    },
    refresh: {
        backgroundColor: 'black',
        height: 50,
        width: 200,
        alignSelf: 'center',
        marginTop: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color: '#ffffff'
    }
});


