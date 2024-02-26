import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (postId, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/comments/${postId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            console.log('{data:response.data, postId}: ', { data: response.data, postId });
            return { data: response.data, postId };
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);
export const createComment = createAsyncThunk(
    "comments/createComment",
    async (data, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            console.log("data: ", data, token);
            const response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/comments/${data.postId}`, { content: data.content }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return { data: response.data, postId: data.postId };
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);