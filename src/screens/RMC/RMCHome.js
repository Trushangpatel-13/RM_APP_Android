import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { AppHeader } from '../../SearchBar';
import ImgUpload from '../../ImgUpload';
import Slider from '../../components/Slider';
import CustomTabs from '../../components/Tabs';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import { RMCBasicDetails } from './BasicDetails';

const RMCHome = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppHeader
                title="Rotor Motor Cleaning"
                menu="arrow-left"
                headerBg="#bebebe"
                titleAlight='center'
                onLeftPress={() => { navigation.navigate("HomeScreen") }}
                fweight = {700}
            />

            <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={{ backgroundColor: '#bebebe' }} underlineStyle={{ backgroundColor: 'black' }} />}>
                <Tab
                    tabStyle={{ backgroundColor: '#bebebe' }}
                    heading="Details"
                    activeTabStyle={{ backgroundColor: '#ff3333' }}
                    textStyle={{ color: 'black', fontWeight: 'bold' }}
                    activeTextStyle={{ color: 'white', fontWeight: 'bold' }}
                >
                <RMCBasicDetails />
                </Tab>
                
                <Tab
                    tabStyle={{ backgroundColor: '#bebebe' }}
                    heading="Add / View Attachment"
                    activeTabStyle={{ backgroundColor: '#ff3333' }}
                    textStyle={{ color: 'black', fontWeight: 'bold' }}
                    activeTextStyle={{ color: 'white', fontWeight: 'bold' }}
                >
                <ImgUpload navigation={navigation} Process={'RMC'}/>
                </Tab>
                

            </Tabs>
        </SafeAreaView>
    );
};

export default RMCHome;