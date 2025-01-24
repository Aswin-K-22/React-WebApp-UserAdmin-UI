import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'; 

export const fetchAdmin = createAsyncThunk(
    'adminAuth/fetchAdmin', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/admin/is-authenticated', { withCredentials: true });
            console.log('[fetchAdmin]: Success:', response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error('[fetchAdmin]: Error:', errorMessage);
            return rejectWithValue({
                message: errorMessage,
                status: error.response?.status || 500,
            });
        }
    }
);

