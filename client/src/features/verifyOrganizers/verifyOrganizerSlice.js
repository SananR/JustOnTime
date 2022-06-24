import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import verifyOrganizerService from './verifyOrganizerService'


//Load organizers
const loadOrganizers = createAsyncThunk('verifyOrganizer/load', async (thunkAPI) => {
    try {
        return await verifyOrganizerService.loadOrganizers();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//Verify Organizer
const verifyOrganizer = createAsyncThunk('verifyOrganizer/verify', async (email, thunkAPI) => {
    try {
        console.log(email)
        return await verifyOrganizerService.verifyOrganizer(email);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
            || error.message || error.toString();
        console.log(error)
        return thunkAPI.rejectWithValue(message);    
    }
})


const initialState = {
    unverifiedOrganizers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const verifyOrganizerSlice = createSlice({
    name: "verifyOrganizer",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrganizers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadOrganizers.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.unverifiedOrganizers = action.payload.users //reconside the name
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "";
            })
            .addCase(loadOrganizers.rejected, (state, action) => {
                console.log("load organizer was rejected: " + action.payload)
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.unverifiedOrganizers = [];
            })
            .addCase(verifyOrganizer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyOrganizer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "";
                try {
                    state.unverifiedOrganizers = state.unverifiedOrganizers.filter(organizer => {
                        return organizer._id !== action.payload.user._id
                    })
                } catch (e) {
                    console.log(e)
                }
                
            })
            .addCase(verifyOrganizer.rejected, (state, action) => {
                console.log("verifyOrganizer was rejected: " + action.payload)
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export { loadOrganizers, verifyOrganizer }
export default verifyOrganizerSlice.reducer;