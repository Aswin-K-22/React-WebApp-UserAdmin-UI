import { createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        setUser(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        clearUser(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
        updateUserProfileImage(state, action) {
            if (state.user) {
                state.user.profilePhoto = action.payload || null; // Set to null if image is deleted
            }
        },
    },
});

export const { setUser, clearUser,updateUserProfileImage } = authSlice.actions;

export const fetchUser = () => async (dispatch) => {
    try {
        const response = await axios.get('/user/is-authenticated', { withCredentials: true });
        console.log('FetchUser Response:', response.data);
        if (response.data.isAuthenticated) {
            dispatch(setUser(response.data));
        } else {
            dispatch(clearUser());
        }
    } catch (error) {
        if (error.response?.status === 401) {
            // Handle unauthorized access silently
            console.warn('User not authenticated');
        } else {
            console.error('Error fetching user:1', error.response?.data?.message || error.message);
        }
        dispatch(clearUser());
    
        
       
    }
};


export default authSlice.reducer;

