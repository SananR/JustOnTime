import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import axios from 'axios';

const eventsAdapter = createEntityAdapter()

const initialState = eventsAdapter.getInitialState({
    status: 'idle'
})

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const response = await axios.get( '/api/event/organizerEvents') // check specific request URI here
    return response.events
})

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                eventsAdapter.setAll(state, action.payload)
                state.status = 'idle';
            })
            .addCase(fetchEvents.rejected, (state) => {
                state.status = 'error';
            })
    }
})

export const { selectAll: selectEvents } = eventsAdapter.getSelectors(state => state.events)
export default eventSlice.reducer;