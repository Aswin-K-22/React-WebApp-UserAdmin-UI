import { createSlice } from '@reduxjs/toolkit';
import { fetchAdmin } from '../middleware/adminFetch';

const adminSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        isAdminAuthenticated: false,
        admin: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setAdmin(state, action) {
            state.isAdminAuthenticated = true;
            state.admin = action.payload;
        },
        clearAdmin(state) {
            state.isAdminAuthenticated = false;
            state.admin = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAdminAuthenticated = true;
                state.admin = action.payload;
            })
            .addCase(fetchAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.isAdminAuthenticated = false;
                state.admin = null;
                state.error = action.payload || 'Failed to fetch admin data';
            });
    },
});



export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;