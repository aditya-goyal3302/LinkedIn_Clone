import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./Signup.Api";


const initialState = {
    status: 'sucessful' | 'failed',
    isLoading: false,
    error: null,
};

const SignupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.status = null;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.status = 'sucessful';
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.status = 'failed';
        })
    }
})

export default SignupSlice.reducer;