import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import verificationService from './verificationService.js';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register user
export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await verificationService.verifyEmail(email, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;