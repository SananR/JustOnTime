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


const initialState = {
    data: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const verifyOrganizerSlice = createSlice({
    name: "verifyOrganizer",
    initialState,
    reducers: {
        organizersLoaded(state, action){
            console.log(action.payload)
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrganizers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadOrganizers.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.data = action.payload
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "";
            })
            .addCase(loadOrganizers.rejected, (state, action) => {
                console.log("load organizer was rejected: " + action.payload)
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.data = {};
            })
    }
})

export { loadOrganizers }
export default verifyOrganizerSlice.reducer;