import React, { Component } from 'react';
import {View,Dimensions,StyleSheet,SafeAreaView,Text} from 'react-native';

export default class CustomTabs extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      
    }
    
  }
render() {
    
    return (
      <SafeAreaView>
        <Text style = {{color:'black'}}> Tabs .js File</Text>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  
})