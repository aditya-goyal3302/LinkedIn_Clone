import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostReactions = createAsyncThunk(
    "reaction/fetchPostReactions",
    async (postId, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            let data = await axios.get(`http://localhost:8080/reactions/posts/${postId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return { postId, data };
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const fetchCommentsReactions = createAsyncThunk(
    "reaction/fetchCommentsReactions",
    async (commentId, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            let data = await axios.get(`http://localhost:8080/reactions/comments/${commentId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return { commentId, data };
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const addPostReaction = createAsyncThunk(
    "reaction/addPostReaction",
    async (data, { getState, rejectWithValue }) => {
        console.log('data: ', data);
        try {
            let token = getState().persistedReducer.token;
            let response = await axios.post(`http://localhost:8080/reactions/posts/${data.postId}`, { reaction: data.reaction }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return { postId: data.postId, response };
        } catch (error) {
            return rejectWithValue(error);
        }
    });