import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/action'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {error } = useSelector(state => state.auth)

  const dispatch = useDispatch();
  
  const loginHandler = () => {
    dispatch(login(email, password))
  }

  // useEffect(() => {
  //   if (error) {
  //     alert(error)
  //     dispatch({ type: "clearError" })
  //   }
  // },[error,dispatch,alert]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }} >Welcome</Text>
      <View style={{ width: "70%" }}>
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
        disabled={!email || !password}
        style={styles.btn}
        onPress={loginHandler}> <Text style={{ color: '#fff' }}>Login</Text></Button>
      <Text
        style={{ marginTop: 20 }}
      >
        Or
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('register')}>
        <Text
          style={{
            color: "#900",
            height: 20,
            margin: 20
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('forgotpassword')}>
        <Text
          style={{
            color: "blue",
            height: 20,
          }}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  )
}


export default Login

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