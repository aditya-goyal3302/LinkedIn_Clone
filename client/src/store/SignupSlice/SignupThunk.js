import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk('signup', async (data, {rejectWithValue})=>{
    try {
        const response = await axios.post('http://localhost:8080/auth/signup', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})