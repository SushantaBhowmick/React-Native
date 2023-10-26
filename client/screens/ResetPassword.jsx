import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { resetPasswordAc } from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextInput } from 'react-native-paper'

const ResetPassword = ({navigation}) => {
    const [otp,setOtp]=useState('')
    const [newPassword,setNewPassword]=useState('');
    const {loading,message,error } = useSelector(state => state.message)

  
    const dispatch = useDispatch();
  
    const resetPasswordHandler=async()=>{
      await dispatch(resetPasswordAc(otp,newPassword));
    navigation.navigate('login')
    }
    useEffect(()=>{
        if(message){
            alert(message);
            dispatch({type:"clearMessage"})
        }
        if(error){
            alert(error);
            dispatch({type:"clearError"})
        }
    },[message,error,alert,dispatch])
    
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 20, margin: 20 }} >RESET PASSWORD</Text>
        <View style={{ width: "70%" }}>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder='OTP'
            value={otp}
            onChangeText={setOtp}
            keyboardType='number-pad'
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder='New Password'
            value={newPassword}
            onChangeText={setNewPassword}
          />
  
        </View>
        <Button
          disabled={!otp || !newPassword||loading}
          style={styles.btn}
          loading={loading}
          onPress={resetPasswordHandler}> <Text style={{ color: '#fff' }}>RESET PASSWORD</Text></Button>
      </View>
    )
  }
  
  export default ResetPassword
  
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: '#900',
      borderRadius: 0,
      padding: 5,
      width: '70%'
  
    },
    input: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: "#b5b5b5",
      padding: 3,
      paddingLeft: 15,
      borderRadius: 10,
      marginVertical: 15,
      fontSize: 15,
  
  
    }
  })
