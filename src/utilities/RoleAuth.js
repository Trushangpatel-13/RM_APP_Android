import AsyncStorage from '@react-native-async-storage/async-storage';

export const role_auth = async () => {
    let role = {}
    let complete_dt = {}

    let user = await AsyncStorage.getItem('userData')
    userData = JSON.parse(user)
    
    let dt = await AsyncStorage.getItem('snapshot')
    complete_dt = JSON.parse(dt)
    
    if (userData != null) {

        if(userData["RMC"]===1){
            role['RMC'] = true 
        }else{
            role['RMC'] = false
        }

        if(userData["RMO"]===1){
            role['RMO'] = true 
        }else{
            role['RMO'] = false
        }
        
        if(userData["RMP"]===1){
            role['RMP'] = true 
        }else{
            role['RMP'] = false
        }
        
        if(userData["RMS"]===1){
            role['RMS'] = true 
        }else{
            role['RMS'] = false
        }
        
        if(complete_dt["Complete_dt"]){
            role['Submit'] = true
        }else{
            role['Submit'] = false
        }

        role['Emp_ID'] = userData['Employee_ID']
        return role
    }
}