import React,{ useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker"

const CameraComponent = ({navigation,route}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, aspect: [1, 1], quality: 1
        });
        return navigation.navigate('register',{image:data.uri})

    }

    const clickPicture = async () => {

        const data = await camera.takePictureAsync();
        return navigation.navigate('register',{image:data.uri})
    }
    
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
  
  
    return (
      <View style={styles.container}>
        <Camera   type={type} style={styles.camera} ratio="1:1" ref={(e) => setCamera(e)} />
          <View style={styles.buttonContainer}>
          <Icon name="image" size={40} color="#fff" 
          onPress={openImagePickerAsync} 
          />
                <Icon name="camera" 
                size={40} color="#fff" 
                onPress={clickPicture} 
                />

                <Icon
                    name="flip-camera-android"
                    size={40}
                    color="#fff"
                    onPress={() =>
                        setType(
                            type === CameraType.back ? CameraType.front : CameraType.back
                        )
                    }
                />
           
          </View>
      </View>
    );
  }

export default CameraComponent

const styles= StyleSheet.create({
    container:{
        flex:1,
    },
    camera:{
        flex: 1,
        aspectRatio: 1
    },
    buttonContainer:{
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
        justifyContent: "space-evenly",
        width: "100%",
    },
})