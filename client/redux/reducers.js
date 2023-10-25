import { createReducer } from "@reduxjs/toolkit";

export const authReducers = createReducer({},{
    registerRequest:(state)=>{
        state.loading=true;
    },
    registerSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    registerFail:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error = action.payload;
    },

    loginRequest:(state)=>{
        state.loading=true;
    },
    loginSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    loginFail:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error = action.payload;
    },

    loadUserRequest:(state)=>{
        state.loading=true;
    },
    loadUserSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user = action.payload.user;
    },
    loadUserFail:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error = action.payload;
    },


    logoutRequest:(state)=>{
        state.loading=true;
    },
    logoutSuccess:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.user = null;
        state.message = action.payload;
    },
    logoutFail:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.error = action.payload;

    },
    
    verificationRequest: (state) => {
        state.loading = true;
      },
      verificationSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      verificationFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

    clearError:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.message = null;
    },
});

export const messageReducer = createReducer({},{
    
    addTaskRequest:(state)=>{
        state.loading=true;
    },
    addTaskSuccess:(state,action)=>{
        state.loading=false;
        state.message = action.payload.message;
    },
    addTaskFail:(state,action)=>{
        state.loading=false;
        state.error = action.payload;
    },
    
    updateTaskRequest:(state)=>{
        state.loading=true;
    },
    updateTaskSuccess:(state,action)=>{
        state.loading=false;
        state.message = action.payload.message;
    },
    updateTaskFail:(state,action)=>{
        state.loading=false;
        state.error = action.payload;
    },
    
    deleteTaskRequest:(state)=>{
        state.loading=true;
    },
    deleteTaskSuccess:(state,action)=>{
        state.loading=false;
        state.message = action.payload.message;
    },
    deleteTaskFail:(state,action)=>{
        state.loading=false;
        state.error = action.payload;
    },
    
    updateProfileRequest:(state)=>{
        state.loading=true;
    },
    updateProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message = action.payload;
    },
    updateProfileFail:(state,action)=>{
        state.loading=false;
        state.error = action.payload;
    },
    
    changePasswordRequest:(state)=>{
        state.loading=true;
    },
    changePasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message = action.payload.message;
    },
    changePasswordFail:(state,action)=>{
        state.loading=false;
        state.error = action.payload;
    },

    clearError:(state)=>{
        state.error = null;
    },
    clearMessage:(state)=>{
        state.message = null;
    },
}) 