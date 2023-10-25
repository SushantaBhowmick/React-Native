import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/action';

const Profile = ({navigation}) => {
  const {user} = useSelector(state=>state.auth)
  const [avatar,setAvatar]= useState(user.avatar.url);
  const [name,setName]= useState(user.name);

  const dispatch = useDispatch();

  const handleImage =()=>{
    
  }
  const updateHandler =()=>{
    
  }
  const logoutHandler =()=>{
    dispatch(logout());
  }
  return (
    <View
    style={{
      flex:1,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center'
    }}
    >
      <Avatar.Image
      size={100}
      source={{uri:avatar?avatar:null}}
      style={{backgroundColor:'gray'}}
       />
       <TouchableOpacity onPress={handleImage}>
        <Text style={{color:'#900',margin:20}}>Change Photo</Text>
       </TouchableOpacity>

       <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder='Name'
          value={name}
          onChangeText={setName}
        />

      </View>
      <Button
      style={styles.btn}
      onPress={updateHandler}
      >
        <Text style={{color:'white'}}>UPDATE</Text>
      </Button>
      
      <View
      style={{
        flexDirection:'row',
        position:'absolute',
        bottom:10,
      }}
      >
      <Button
      onPress={()=>navigation.navigate("changepassword")}
      >
       CHANGE PASSWORD
      </Button>
      <Button
      onPress={logoutHandler}
      >
       LOGOUT
      </Button>
      </View>
    </View>
  )
}

export default Profile
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