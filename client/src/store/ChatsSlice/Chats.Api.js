import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  


const createChatRoom = createAsyncThunk(
    'Messaging/CreateChatRoom',
    async (payload,{getState,rejectWithValue})=>{
        try{
            const user = getState().persistedReducer;
            const response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/chats`,payload,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token
                }
            });
            return {data:response.data,userId:user.user._id};
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

const getChats = createAsyncThunk(
    'Messaging/GetChats',
    async (payload,{getState,rejectWithValue})=>{
        try{
            const user = getState().persistedReducer;
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/chats`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: user.token
                }
            });
            return {data:response.data , userId:user.user._id};
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)

export { createChatRoom, getChats }