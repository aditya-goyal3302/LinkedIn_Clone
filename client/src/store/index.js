import { configureStore } from '@reduxjs/toolkit';
import login_reducer from './LoginSlice/LoginSlice';
import signup_reducer from './SignupSlice/SignupSlice';
export const store = configureStore({
    reducer: {
        login_reducer,
        signup_reducer
    }
})