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