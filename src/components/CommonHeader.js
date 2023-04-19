import React from 'react';
import { View, StyleSheet,Dimensions,Text } from 'react-native';
import CustomCard from './Card';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const CommonHeader = ({val}) => {
    return (
        <CustomCard style={{ ...styles.card}}>
            <View style={{ ...styles.CardContent,paddingHorizontal:10}}>
                <Text style={{ ...styles.textTitleCard, fontSize: 15 }}>{val.Customer_name}</Text>
                <Text style={{ ...styles.textTitleCard, fontSize: 12 }}>IBO No : {val.IBO_no}</Text>
                <Text style={{ ...styles.textTitleCard, fontSize: 12 }}>RM No : {val.RM_No}</Text>
            </View>
        </CustomCard>
    );
};
const styles = StyleSheet.create({

    card: {
        height: deviceHeight * 0.08,
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
export default CommonHeader;