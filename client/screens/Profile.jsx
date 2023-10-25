import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout, updateProfile } from '../redux/action';
import mime from 'mime'
import Loader from '../components/Loader';

const Profile = ({navigation,route}) => {
  const {user,loading} = useSelector(state=>state.auth)
  const [avatar,setAvatar]= useState(user.avatar.url);
  const [name,setName]= useState(user.name);

  const dispatch = useDispatch();

  const handleImage =()=>{
    navigation.navigate("camera",{
      updateProfile:true,
    })
  }
  const updateHandler =async()=>{
    const myForm = new FormData();
    myForm.append("name",name);
    myForm.append("avatar",{
      uri:avatar,
      type:mime.getType(avatar),
      name:avatar.split("/").pop()
    });
   await dispatch(updateProfile(myForm))
   dispatch(loadUser());
  }
  const logoutHandler =()=>{
    dispatch(logout());
  }
  const verifyHandler =()=>{
  
  }
  useEffect(()=>{
    if(route.params){
      if(route.params.image){
        setAvatar(route.params.image)
      }
    }
  },[route])
  return (
   loading? <Loader />:
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
     {
      user.verified? null:
      <Button
     onPress={()=>navigation.navigate('verify')}
     >
      <Text  style={{
        color:'#900',
        fontSize:18,
        borderWidth:2,
        borderColor:'#900',
        borderRadius:5,
        marginTop:20,
        padding:7,
        height:30
       
        }}
        >
      VERIFY YOUR ACCOUNT</Text>
     </Button>
     }
     
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
    backgroundColor: 'gray',
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