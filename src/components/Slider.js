import React, { Component } from "react";
import { StyleSheet, Text, View,Dimensions,TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { SliderBox } from "react-native-image-slider-box";
import { BASEURL } from "../URL";
import FastImage from "react-native-fast-image";
import { showToast } from "./Toast";
import { role_auth } from "../utilities/RoleAuth";
import Pinchable from 'react-native-pinchable';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default class Slider extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      process :this.props.route.params.Proc,
      IBO : this.props.route.params.IBO_No,
      images: [],
      index:0,
      allow:false,
      load:false
      //images:["http://10.0.2.2:5000/static/uploads/123654/RMP/123654_31-03-23_14-21-42_RMP_1233.jpg"]
    };
  }
  handleClick() {
    this.forceUpdate();
  }
  /*
  componentDidUpdate(){
    console.log("ReRender")
  }*/
  componentDidMount (){
    
    getRoleData = async () => {
      let role = await role_auth()
      console.log("Role",role[this.state.process])
      if(role[this.state.process] === true){
        this.setState({
          
        allow:true
      })
      console.log("True")
      }
      else{
        this.setState({
        allow:false
      })
      console.log("False")
      }
    }
    console.log(this.state.process)
    axios({
        method: "get",
        params:{IBO:this.state.IBO,Process:this.state.process},
        url: BASEURL+"/image/get",
        headers: { "Access-Control-Allow-Origin": '*' },
      })
    .then((response) => {
      console.log(response.data.images);
      
      this.setState({
        images:response.data.images
      })
      if(this.state.images.length > 0){
          this.setState({
            load:true
          })
      }
      else{
        this.setState({
          load:false
        })
      }
    });
    getRoleData()
    
  }

  handleDelete(){
    console.log(this.state.index)
    const removed = this.state.images.splice(this.state.index, 1);
    console.log(removed[0])
    axios({
      method: "get",
      params:{'path':removed[0]},
      url: BASEURL+"/image/delete",
      headers: { "Access-Control-Allow-Origin": '*' },
    })
  .then((response) => {
    if(response.status == 200){
    console.log(response.data);
    showToast("success",this.state.process,'Deleted Successfully')
    setTimeout(() => {
      this.props.navigation.goBack()
    }, 2000);
    
  }
    
  });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.load ? 
        
        <SliderBox
          Image={FastImage}  
          images={this.state.images}
          
          currentImageEmitter={(index) => {this.setState({index:index})}}
          sliderBoxHeight={deviceHeight-200}
          resizeMethod={'resize'}
          resizeMode={'cover'}
          dotColor="#ff0000"
          inactiveDotColor="#4d4d4d"
          ImageComponentStyle={{borderRadius: 15, width: '98%', marginTop: 5}}
          
          paginationBoxStyle={{
            position: 'relative',
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 5
          }}
          dotStyle={{
            width: 20,
            height: 20,
            borderRadius: 5,
            marginHorizontal: 3,
            padding: 0,
            margin: 10,
            backgroundColor: "#808080"
          }}
        />
        
        :null}
        <View style={styles.Delete}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{width:deviceWidth*0.35,height:40,marginHorizontal:25,borderRadius:5,backgroundColor:'#1a1a1a',alignContent:'center',alignContent:'center', justifyContent:'center'}}>
                <Text style={{textAlign:'center',color:'white'}}>Back</Text>
            </TouchableOpacity>
            {this.state.allow ? 
            <TouchableOpacity onPress={()=>this.handleDelete()} style={{width:deviceWidth*0.35,height:40,borderRadius:5,marginHorizontal:25,backgroundColor:'#ff1a1a',alignContent:'center',alignContent:'center', justifyContent:'center'}}>
                <Text style={{textAlign:'center',color:'white'}}>Delete</Text>
            </TouchableOpacity>
            :null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6"
  },
  Delete:{
    flex:1,
    flexDirection:'row',
    
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  }
});