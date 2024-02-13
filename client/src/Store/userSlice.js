import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const Login_user = createAsyncThunk(
    'user/fetchUser',
    async (thunkAPI) => {
        const responseonse = axios.post('http://localhost:2948/admin/login',
        {
            method:"POST",
            body:JSON.stringify({
                email: thunkAPI.email,
                password: thunkAPI.password
            }),
            headers:{ 
                "Content-Type":"application/json"
            }
        });
        return responseonse.json();
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        user: {},
        token: '',
        isLoading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        Login: (state, action) => {
            console.log(action)
            state.isAuth = true;
            state.user = action.payload;
        },
        Logout: (state, action) => {
            state.isAuth = false;
            state.user = {};
        },
    },
    extraReducers: (builders)=>{
        builders.addCase(Login_user.pending, (state, action) => {
            state.isLoading = true;
        });
        builders.addCase(Login_user.rejected, (state, action) => {
            state.isLoading = false;
        });
        builders.addCase(Login_user.fulfilled, (state, action) => {
            state.isAuth = true;
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('ssotoken', action.payload.token);
        });
    
    }
});

export const {setAuth,Login,Logout} = userSlice.actions;
export default userSlice.reducer;