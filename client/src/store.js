import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import verifyOrganizerSlice from "./features/verifyOrganizers/verifyOrganizerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        verifyOrganizer: verifyOrganizerSlice
    }
})
