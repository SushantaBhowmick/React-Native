import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home'
import Login from './screens/Login'

const Stack = createNativeStackNavigator()

const Main = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='login' component={Login} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main