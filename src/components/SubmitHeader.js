import React from 'react';
import { View, StyleSheet,Dimensions,Text } from 'react-native';
import CustomCard from './Card';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const SubmitHeader = ({val}) => {
    return (
        <CustomCard style={{ ...styles.card}}>
            <View style={{ ...styles.CardContent,paddingHorizontal:5}}>
                <Text style={{ ...styles.textTitleCard, fontSize: 15 }}>Submitted By : {val.Tech_RMC_ID} at {val.RMC_Dt}</Text>
            </View>
        </CustomCard>
    );
};
const styles = StyleSheet.create({

    card: {
        height: deviceHeight * 0.04,
        width: '98%',
        marginTop: 10,
        backgroundColor: '#d9d9d9',
        padding:5


    },
    CardContent: {
        flex: 1,
    },
    textTitleCard: {
        fontFamily: 'Courier_Bold',
        fontWeight: 'bold',
        color: 'black',

    }
});
export default SubmitHeader;