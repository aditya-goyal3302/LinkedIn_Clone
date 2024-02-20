import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async (payload,{getState}) => {
        const state = getState()
        console.log("state: ", state.login_reducer.token)
        const response = await axios.get('http://localhost:8080/posts',
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: state.login_reducer.token
            }
        });
        return response.data;
    }
);