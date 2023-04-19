import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import Scan from './scan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './components/Loader';
import CheckConnetion from './CheckConnection';
import { View  } from 'react-native';
import RMCHome from './screens/RMC/RMCHome';
import RMPHome from './screens/RMP/RMPHome';
import RMOHome from './screens/RMO/RMOHome';
import RMSHome from './screens/RMS/RMSHome';
import Slider from './components/Slider';

import { RMPScanDetails } from './screens/RMP/RMPScanDetails';
import ModuleScan from './components/ModuleScan';
const Stack = createNativeStackNavigator();
import Toast from 'react-native-toast-message';

const Main = () => {
  const [isConnected, setIsConnected] = React.useState(false)
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  
  const authUser = async () => {
    try {
      
      
      let userData = await AsyncStorage.getItem('userData');
      
      
        
        userData = JSON.parse(userData);
        console.log("main",userData);
        if (userData.loggedIn) {
          
          setInitialRouteName('HomeScreen');
        } else {
          
          setInitialRouteName('LoginScreen');
        }
      }
    catch (error) {
      setInitialRouteName('LoginScreen');
    
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isConnected == true ? (
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            {!initialRouteName ? (
              <Loader visible={true} />
            ) : (
              <>
                <Stack.Navigator
                  initialRouteName={initialRouteName}
                  screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                  name="RegistrationScreen"
                  component={RegistrationScreen}
                  />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="HomeScreen" component={HomeScreen} />
                  <Stack.Screen name="Scan" component={Scan} />
                  <Stack.Screen name="RMCHome" component={RMCHome} />
                  <Stack.Screen name="RMPHome" component={RMPHome} />
                  <Stack.Screen name="RMOHome" component={RMOHome} />
                  <Stack.Screen name="RMSHome" component={RMSHome} />
                  
                  <Stack.Screen name="Slider" component={Slider} />
                  <Stack.Screen name="RMPScanDetails" component={RMPScanDetails} />
                  <Stack.Screen name="ModuleScan" component={ModuleScan} />
                 

                </Stack.Navigator>
              </>
            )}
          </NavigationContainer>
        </View>
      ) : (
        <CheckConnetion isConnected={isConnected} setIsConnected={setIsConnected} />
      )}
      <Toast/>
    </View>
  );
};

export default Main;