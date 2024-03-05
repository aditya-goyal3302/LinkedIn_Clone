import { createSlice } from '@reduxjs/toolkit';
import { getMessages } from './Messaging.Api';
const initialState = {
    messages: {},
    chats: [],
    loading: false,
    error: null
}

const MessagingSlice = createSlice({
    name: 'Messaging',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.messages = action.payload;
        })
        builder.addCase(getMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default MessagingSlice.reducer;