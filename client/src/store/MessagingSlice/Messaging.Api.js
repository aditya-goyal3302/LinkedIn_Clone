import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getMessages = createAsyncThunk(
    'Messaging/GetMessages',
    async (payload,{getState,rejectWithValue})=>{
        try{
            const token = getState().persistedReducer.token;
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/chats/${payload}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            });
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

export { getMessages }