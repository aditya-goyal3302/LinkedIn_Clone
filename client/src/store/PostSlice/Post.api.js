import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async (payload,{getState}) => {
        const state = getState()
        // console.log("state: ", state.persistedReducer.token)
        const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/posts`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: state.persistedReducer.token
            }
        });
        // console.log('response.data: ', response.data);
        return response.data;
    }
);

export const createPost = createAsyncThunk(
    'feed/createPost',
    async (payload,{getState}) => {
        console.log('payload: ', payload);
        const state = getState()
        // let data = JSON.stringify(payload)
        console.log("state: ", state.persistedReducer.token)
        const response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/posts`, payload,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: state.persistedReducer.token
            }
        });
        return response.data;
    }
);
