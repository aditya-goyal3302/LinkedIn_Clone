import {createSlice} from '@reduxjs/toolkit';
import { login } from './LoginThunk';

const initialState = {
    user: null,
    isLoading: false,
    token: null,
    error: null,
}

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state)=> {
            state.user = null;
            state.token = null;
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
            state.error = action.payload;
            state.user = null;
            state.token = null;
        })
    }
})
export const {logout} = LoginSlice.actions; 
export default LoginSlice.reducer;
