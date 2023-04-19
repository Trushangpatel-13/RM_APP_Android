import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASEURL } from '../URL';
import React, { useEffect } from 'react';


export const update_db = async(ibo) =>{
    
    let snapshot = await AsyncStorage.getItem('snapshot');
    let data = JSON.parse(snapshot)
    console.log("Snapshot",snapshot)
    let formdata = new FormData();
    formdata.append("IBO", ibo)
    formdata.append("data", JSON.stringify(data))
   result = await axios({
        method: "post",
        url: BASEURL+"/post/data/all",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" ,
        "Access-Control-Allow-Origin": '*'            
      },
      }).then((response)=>{
        //console.log("API",response.data)
        return response.data
      })
      console.log("API",result)
      return await result
      
}