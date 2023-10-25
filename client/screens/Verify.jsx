import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loadUser, verify } from '../redux/action';

const Verify = () => {
    const [otp,setOtp] = useState('');
const dispatch = useDispatch();
    const otpHandler =async()=>{
       await dispatch(verify(otp))
       dispatch(loadUser())
    }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }} >Verify Your Account</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder='OTP'
          value={otp}
          onChangeText={setOtp}
          keyboardType='number-pad'
        />


      </View>
      <Button
        disabled={!otp }
        style={styles.btn}
        onPress={otpHandler}> <Text style={{ color: '#fff' }}>VERIFY</Text></Button>
      
  
    </View>
  )
}

export default Verify

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