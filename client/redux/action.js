import axios from "axios";
import { server } from "./store";

export const register =(formData)=>async(dispatch)=>{
    try {
        dispatch({type:"registerRequest"})

        const {data} = await axios.post(`${server}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        dispatch({
            type:"registerSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"registerFail",
            payload:error.response.data.message
        })
    }
}

export const verify =(otp)=>async(dispatch)=>{
    try {
        dispatch({type:"verificationRequest"})

        const {data} = await axios.post(`${server}/verify`,{otp},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"verificationSuccess",
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:"verificationFail",
            payload:error.response.data.message
        })
    }
}

export const login =(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"loginRequest"})

        const {data} = await axios.post(`${server}/login`,{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"loginSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"loginFail",
            payload:error.response.data.message
        })
    }
}

export const loadUser =()=>async(dispatch)=>{
    try {
        dispatch({type:"loadUserRequest"})

        const {data} = await axios.get(`${server}/me`)
        dispatch({
            type:"loadUserSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"loadUserFail",
            payload:error.response.data.message
        })
    }
}

export const addTask =(title,description)=>async(dispatch)=>{
    try {
        dispatch({type:"addTaskRequest"})

        const {data} = await axios.post(`${server}/newTask`,
        {title,description},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"addTaskSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"addTaskFail",
            payload:error.response.data.message
        })
    }
}

export const updateTask =(taskId)=>async(dispatch)=>{
    try {
        dispatch({type:"updateTaskRequest"})

        const {data} = await axios.get(`${server}/task/${taskId}`);
        dispatch({
            type:"updateTaskSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"updateTaskFail",
            payload:error.response.data.message
        })
    }
}

export const logout =()=>async(dispatch)=>{
    try {
        dispatch({type:"logoutRequest"})

        const {data} = await axios.get(`${server}/logout`);
        dispatch({
            type:"logoutSuccess",
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:"logoutFail",
            payload:error.response.data.message
        })
    }
}

export const deleteTask =(taskId)=>async(dispatch)=>{
    try {
        dispatch({type:"deleteTaskRequest"})

        const {data} = await axios.delete(`${server}/task/${taskId}`);
        dispatch({
            type:"deleteTaskSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"deleteTaskFail",
            payload:error.response.data.message
        })
    }
}

export const updateProfile =(formData)=>async(dispatch)=>{
    try {
        dispatch({type:"updateProfileRequest"})

        const {data} = await axios.put(`${server}/updateprofile`,formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        dispatch({
            type:"updateProfileSuccess",
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:"updateProfileFail",
            payload:error.response.data.message
        })
    }
}

export const ChangePassword =(oldPassword,newPassword)=>async(dispatch)=>{
    try {
        dispatch({type:"changePasswordRequest"})

        const {data} = await axios.put(`${server}/updatepassword`,{oldPassword,newPassword},
        {
            headers:{
              "Content-Type": "application/json",
                
            }
        });
        dispatch({
            type:"changePasswordSuccess",
            payload:data
        })

    } catch (error) {
        dispatch({
            type:"changePasswordFail",
            payload:error.response.data.message
        })
    }
}