import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import eventsReducer from './features/event/eventSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer
    }
})
