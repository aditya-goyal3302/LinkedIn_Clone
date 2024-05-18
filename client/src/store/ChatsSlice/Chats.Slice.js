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
            let chats=[];
            action.payload.data.forEach((chat)=>{
                chats.push(setUser(chat,action.payload.userId));
            })
            state.chats = chats;
            console.log('chats: ', chats);
        })
        builder.addCase(getChats.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    }
})

const setUser = (data,userId) => {
    let selectedUser ;
    data.users.map((user)=>{
        if(user._id !== userId){
            selectedUser = user;
        }
        return null;
    })
    data.users = selectedUser;
    return data;
}

export default chatSlice.reducer;