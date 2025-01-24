import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const adminSlice =createSlice({
    name : 'adminAuth',
    initialState :{
        isAdminAuthenticated : false,
        admin : null,
    },
    reducers :{
        setAdmin(state , action){
            state.isAdminAuthenticated = true;
            state.admin = action.payload;
        },
        clearAdmin(state ){
            state.isAdminAuthenticated =false;
            state.admin = null;
        }
    }
})

export const { setAdmin,clearAdmin} = adminSlice.actions


const fetchAdmin = async (dispatch) => {
    try {
        const response = await axios.get('/admin/is-authenticated' ,{withCredentials : true} );
        console.log('FetchAdmin Response:', response.data);
        if (response.data.isAuthenticated) {
            dispatch(setAdmin(response.data));
        } else {
            dispatch(clearAdmin());
        }
    } catch (error) {
        if (error.response?.status === 401) {
            // Handle unauthorized access silently
            console.warn('Admin not authenticated');
        } else {
            console.error('Error fetching Admin', error.response?.data?.message || error.message);
        }
        dispatch(clearAdmin());
    }
}

export {fetchAdmin};
export default adminSlice.reducer;