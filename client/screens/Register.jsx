import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextInput } from 'react-native-paper'

const Register = ({navigation,route}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')


  const handleImage=()=>{
    navigation.navigate("camera")
  }
  const submitHandler=()=>{
    console.log("Image has changed")
    console.log(name,email,password)
    console.log(route.params.image)
  }
  useEffect(()=>{
    if(route.params){
      if(route.params.image){
        setAvatar(route.params.image)
      }
    }
  },[route])
  return (
    <View
    style={{
      flex:1,
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center'
    }}
    >
    <Avatar.Image
      size={100}
      source={{uri:avatar?avatar:null}}
      style={{backgroundColor:"gray"}}
    />
    <TouchableOpacity onPress={handleImage}>
      <Text style={{color:'#900'}}>Change Photo</Text>
    </TouchableOpacity>
    <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
           <TextInput
          secureTextEntry
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
        />
        </View>
        <Button
        disabled={!name || !email || !password}
        style={styles.btn}
        onPress={submitHandler}> <Text style={{color:'#fff'}}>REGISTER</Text></Button>
        <TouchableOpacity onPress={()=>navigation.navigate("login")}>
      <Text
      style={{color:"#900",height:30,margin:20}}
      >Have an Account, Login</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  btn: {
    backgroundColor:'#900',
    borderRadius:0,
    padding:5,
    width:'70%'
 
   },
   input: {
     backgroundColor: 'white',
     borderWidth: 1,
     borderColor: "#b5b5b5",
     padding: 5,
     paddingLeft: 15,
     borderRadius: 10,
     marginVertical: 15,
     fontSize: 15,
     
     
   }
 })