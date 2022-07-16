import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService';

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
        return await authService.registerUser(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//Register organizer
export const registerOrganizer = createAsyncThunk("auth/organizer/register", async (user, thunkAPI) => {
    try {
        return await authService.registerOrganizer(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//Login user
export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.loginUser(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//Logout user
export const logoutUser = createAsyncThunk('auth/logout', async (user,thunkAPI) => {
    try {
        return await authService.logoutUser();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})


export const updateUser =  createAsyncThunk('auth/update', async (id, thunkAPI) => {
    try {
        return await authService.updateUser(id); 
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
            state.user = {};
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            //Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            //Register organizer
            .addCase(registerOrganizer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerOrganizer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "";
            })
            .addCase(registerOrganizer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            //Login user
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            //Update user
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "";
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            //Logout user
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.user = null;
                state.message = "";
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;