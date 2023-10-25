import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Login from './screens/Login'
import Footer from './components/Footer'
import Profile from './screens/Profile'
import Register from './screens/Register'
import CameraComponent from './screens/Camera'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/action'
import { Text } from 'react-native-paper'
import Loader from './components/Loader'


const Main = () => {
  const Stack = createNativeStackNavigator()
const { isAuthenticated,message, loading ,error} = useSelector(state => state.auth)
const dispatch = useDispatch();

useEffect(()=>{
  if(error){
    alert(error)
    dispatch({type:"clearError"})
  }
  if(message){
    alert(message)
    dispatch({type:"clearMessage"})
  }
},[dispatch,error,message,alert])

useEffect(()=>{
dispatch(loadUser())  
},[dispatch])
  return (
  loading?<Loader />:
  <NavigationContainer>
  <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
    <Stack.Screen name='home' component={Home} options={{ headerShown: false }} />
    <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
    <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />
    <Stack.Screen name='camera' component={CameraComponent} options={{ headerShown: false }} />
    <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
  </Stack.Navigator>
  {isAuthenticated &&  
    <Footer />
  }
</NavigationContainer>
  )
}

export default Main