import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPostReactions = createAsyncThunk(
    "reaction/fetchPostReactions",
    async (postId, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            let data = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/reactions/posts/${postId}`, {
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
            let data = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/reactions/comments/${commentId}`, {
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
        try {
            let token = getState().persistedReducer.token;
            let response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/reactions/posts/${data.postId}`, { reaction: data.newReaction }, {
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

export const addCommentReaction = createAsyncThunk(
    "reaction/addCommentReaction",
    async (data, { getState, rejectWithValue }) => {
        try {
            let token = getState().persistedReducer.token;
            let response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/reactions/comments/${data.commentId}`, { reaction: data.newReaction }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            return { commentId: data.commentId, response };
        } catch (error) {
            return rejectWithValue(error);
        }
    });