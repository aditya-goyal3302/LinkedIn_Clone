import { createSlice, current } from '@reduxjs/toolkit';
import { getMessages} from './Messaging.Api';
const initialState = {
    messages: {},
    loading: false,
    error: null
}

const MessagingSlice = createSlice({
    name: 'Messaging',
    initialState,
    reducers: {
        getMessagesSuccess: (state, action) => {
            state.loading = false;
            const messages = current(state.messages);
            console.log(action.payload.roomId,"***********",messages[action.payload.roomId]);
            state.messages[action.payload.roomId].push(action.payload.data);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.messages[action.payload.roomId] = action.payload.data;
        })
        builder.addCase(getMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
       

    }
})
export const { getMessagesSuccess } = MessagingSlice.actions;
export default MessagingSlice.reducer;