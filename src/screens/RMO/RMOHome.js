import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { AppHeader } from '../../SearchBar';
import ImgUpload from '../../ImgUpload';
import Slider from '../../components/Slider';
import CustomTabs from '../../components/Tabs';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';

import { RMOBasicDetails } from './RMOBasicDetails';
import { RMOPNCDetails } from './RMOPNCDetails';
import CommonHeader from '../../components/CommonHeader';
const RMOHome = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader
                title="Rotor Motor Opening"
                menu="arrow-left"
                headerBg="#bebebe"
                titleAlight='center'
                onLeftPress={() => { navigation.navigate("HomeScreen") }}
                fweight = {700}
            />

            <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={{ backgroundColor: '#bebebe' }} underlineStyle={{ backgroundColor: 'black' }} />}>
                <Tab
                    tabStyle={{ backgroundColor: '#bebebe' }}
                    heading="Basic Details"
                    activeTabStyle={{ backgroundColor: '#ff3333' }}
                    textStyle={{ color: 'black', fontWeight: 'bold' }}
                    activeTextStyle={{ color: 'white', fontWeight: 'bold' }}
                >
                <RMOBasicDetails/>
                </Tab>

                <Tab
                    tabStyle={{ backgroundColor: '#bebebe' }}
                    heading="PNC"
                    activeTabStyle={{ backgroundColor: '#ff3333' }}
                    textStyle={{ color: 'black', fontWeight: 'bold' }}
                    activeTextStyle={{ color: 'white', fontWeight: 'bold' }}
                >
                <RMOPNCDetails/>
                </Tab>

                <Tab
                    tabStyle={{ backgroundColor: '#bebebe' }}
                    heading="Add / View Attachment"
                    activeTabStyle={{ backgroundColor: '#ff3333' }}
                    textStyle={{ color: 'black', fontWeight: 'bold' }}
                    activeTextStyle={{ color: 'white', fontWeight: 'bold' }}
                >
                <ImgUpload navigation={navigation} Process={'RMO'}/>
                </Tab>
                
                

            </Tabs>
        </SafeAreaView>
    );
};

export default RMOHome;