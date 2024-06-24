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

export const createSubComment = createAsyncThunk(
    "comments/createSubComment",
    async (data, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            const response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/comments/sub-comment/${data.commentId}`, { content: data.content }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return { data: response.data, commentId: data.commentId };
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);

export const fetchSubComments = createAsyncThunk(
    "comments/fetchSubComments",
    async (commentId, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/comments/sub-comment/${commentId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            })
            return { data: response.data, commentId };
        } catch (error) {
            return rejectWithValue({ error: error.message });
        }
    }
);
                                                                                                                                                                                                                                                                                   


