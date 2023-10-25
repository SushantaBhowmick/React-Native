import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/Entypo'
import { Dialog, Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, loadUser } from '../redux/action'

const Home = ({ navigation }) => {
  const {user} =useSelector(state=>state.auth)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const {loading,message,error} = useSelector(state=>state.message)

  const [openDialog, setOpenDialog] = useState(false)
  const hiDialog = () => {
    setOpenDialog(!openDialog)
  }
  const addTaskHandler = async() => {
   await dispatch(addTask(title,description))
   dispatch(loadUser());
  }
  useEffect(()=>{
    if(error){
      alert(error);
      dispatch({type:"clearError"})
    }
    if(message){
      alert(message);
      dispatch({type:"clearMessage"})
    }
  },[error,message,dispatch,alert])
  return (
    <>
      <View style={{ backgroundColor: '#fff', flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <ScrollView>
        <SafeAreaView>
          <Text style={styles.heading} >
            All Tasks
          </Text>
          {
            user && user.tasks.map((item) => (
              <Task key={item._id}
                title={item.title}
                description={item.description}
                status={item.completion}
                taskId={item._id}
              />
            ))
          }
          <TouchableOpacity
            style={styles.addBtn}
            onPress={hiDialog}
          >
            <Icon name='add-to-list' size={20} color={"#900"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        </ScrollView>
      </View>
      <Dialog visible={openDialog} onDismiss={hiDialog}>
        <Dialog.Title>ADD A TASk</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder='Title'
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder='Description'
            value={description}
            onChangeText={setDescription}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={hiDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button textColor='#900'
              onPress={addTaskHandler}
              disabled={!title || !description || loading}
            >ADD</Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 25,
    color: '#fff',
    backgroundColor: '#474747'
  },
  addBtn: {
    backgroundColor: 'white',
    borderRadius: 100,
    elevation: 5,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,

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