import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async (payload,{getState}) => {
        const state = getState()
        console.log("state: ", state.persistedReducer.token)
        const response = await axios.get('http://localhost:8080/posts',
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: state.persistedReducer.token
            }
        });
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
        const response = await axios.post('http://localhost:8080/posts',{...payload},
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: state.persistedReducer.token
            }
        });
        return response.data;
    }
);
