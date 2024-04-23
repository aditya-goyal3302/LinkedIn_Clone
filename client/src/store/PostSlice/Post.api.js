import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    
    async (payload,{getState,rejectWithValue}) => {
        try {
            const state = getState()
            var time = Date.now()
            if (payload?.time) {
                time = new Date(payload.time)
            }
            // console.log("state: ", state.persistedReducer.token)
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/posts/next/${time}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: state.persistedReducer.token
                }
            });
            // console.log('response.data : ', response.data );
            return response.data ;
        } catch (error) {
            return rejectWithValue({ error });
        }
    }
);

export const createPost = createAsyncThunk(
    'feed/createPost',
    async (payload,{getState, rejectWithValue}) => {
        try {
            console.log('payload: ', payload);
            const state = getState()
            console.log("state: ", state.persistedReducer.token)
            const response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/posts`, payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: state.persistedReducer.token
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue({ error });
        }
    }
);


                                                                                                                                                                                                                  