import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAc } from '../redux/action'

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('')
  const {loading } = useSelector(state => state.message)

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (error) {
  //     alert(error)
  //     dispatch({ type: "clearError" })
  //   }
  // },[error,dispatch,alert]);
  const submitHandler =async()=>{
    await dispatch(forgotPasswordAc(email))
    navigation.navigate('resetpassword')
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
      <Text style={{ fontSize: 20, margin: 20 }} >Forgot Password</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder='Enter your register email'
          value={email}
          onChangeText={setEmail}
        />
       

      </View>
      <Button
        disabled={!email|| loading }
        loading={loading}
        style={styles.btn}
        onPress={submitHandler}> <Text style={{ color: '#fff' }}>SEND EMAIL
        </Text>
        </Button>

    </View>
  )
}


export default ForgotPassword


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