import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
    "comment/fetchComments",
    async (postId, thunkAPI,{getState}) => {
        let token = getState().persistedReducer.token;
        try {
        const response = await axios.get(`/comment/${postId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return response.data;
        } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
export const createComment = createAsyncThunk(
    "comment/createComment",
    async (data, thunkAPI,{getState}) => {
        try {
        let token = getState().persistedReducer.token;
        const response = await axios.post("/comment", data,{
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        return response.data;
        } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);