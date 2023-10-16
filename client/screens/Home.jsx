import { View, Text,SafeAreaView,Platform,StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = ({navigation}) => {
    // const navigation = useNavigation()
  return (
    <View style={{backgroundColor:'#fff',flex:1,paddingTop:Platform.OS === 'android'?StatusBar.currentHeight:0}}>
    <SafeAreaView>
      <Text
      style={{
        fontSize:28,
        textAlign:'center',
        marginTop:10,
        color:'#fff',
        backgroundColor:'#474747'
      }}
       >
       All Tasks
      </Text>
    </SafeAreaView>
    </View>
  )
}

export default Home