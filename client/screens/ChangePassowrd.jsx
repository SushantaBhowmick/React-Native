import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { ChangePassword } from '../redux/action'
import { useDispatch } from 'react-redux'

const ChangePassowrd = () => {
  const [oldPassword,setOldPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')

  const dispatch = useDispatch();

  const changePassowrdHandler=()=>{
    dispatch(ChangePassword(oldPassword,newPassword))
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
      <Text style={{ fontSize: 20, margin: 20 }} >CHANGE PASSWORD</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder='Old Password'
          value={oldPassword}
          onChangeText={setOldPassword}
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
        disabled={!oldPassword || !newPassword}
        style={styles.btn}
        onPress={changePassowrdHandler}> <Text style={{ color: '#fff' }}>CHANGE PASSWORD</Text></Button>
    
    </View>
  )
}

export default ChangePassowrd

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