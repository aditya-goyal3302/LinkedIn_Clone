import {createSlice} from '@reduxjs/toolkit';
import { login } from './Login.Api';

const initialState = {
    user: null,
    isLoading: false,
    token: null,
    error: false,
}

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state)=> {
            state.user = null;
            state.token = null;
            state.error = false;
        },
        reset: (state)=>{
            // console.log('reset: ');
            state.error = false;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
            state.user = null;
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.user = action.payload.data;
            state.token = action.payload.token;
            state.error = null;
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = {message:action.payload ,status:true};
            state.user = null;
            state.token = null;
        })
    }
})
export const {logout,reset} = LoginSlice.actions; 
export default LoginSlice.reducer;
