import { createSlice } from '@reduxjs/toolkit';
import { createChatRoom, getChats } from './Chats.Api';
const initialState = {
    chats: [],
    isLoading: false,
    error: null
}

const chatSlice = createSlice({
    name: 'Messaging',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createChatRoom.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createChatRoom.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chats.unshift(action.payload);
        })
        builder.addCase(createChatRoom.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        builder.addCase(getChats.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getChats.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.chats = action.payload.data;
            let chats=[];
            action.payload.data.forEach((chat)=>{
                chats.push(setUser(chat,action.payload.userId));
            })
            state.chats = chats;
            // console.log('action.payload: ', action.payload);
            // console.log('users: ', state.chats);
            console.log('chats: ', chats);
        })
        builder.addCase(getChats.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    }
})

const setUser = (data,userId) => {
    // console.log('data,userId: ', data,userId);
    let selectedUser ;
    data.users.map((user)=>{
        if(user._id !== userId){
            selectedUser = user;
        }
    })
    data.users = selectedUser;
    return data;
}

export default chatSlice.reducer;