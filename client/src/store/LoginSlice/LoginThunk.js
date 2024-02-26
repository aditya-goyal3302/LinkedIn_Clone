import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('login/login', async (data, {rejectWithValue})=>{
    try {
        const res = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/auth/login`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
