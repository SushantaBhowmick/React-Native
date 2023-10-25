import {configureStore} from '@reduxjs/toolkit'
import { authReducers, messageReducer } from './reducers';

const store = configureStore({
    reducer:{
        auth: authReducers,
        message:messageReducer,
    }
});

export default store;
export const server = 'https://react-native-3qgk.onrender.com/api/v1';