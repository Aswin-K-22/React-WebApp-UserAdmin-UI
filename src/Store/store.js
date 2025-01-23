import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import admin from './slices/admin';
const store = configureStore({
    reducer: {
        auth: authReducer,
        admin 
    },
});

export default store;
