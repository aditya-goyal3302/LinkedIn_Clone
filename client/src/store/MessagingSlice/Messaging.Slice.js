import { createSlice } from '@reduxjs/toolkit';
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
        // getMessages: (state, action) => {
        //     state.loading = true;
        // },
        getMessagesSuccess: (state, action) => {
            // console.log('action: ', action.payload);
            state.loading = false;
            state.messages[action.payload.roomId].push(action.payload.data);
        },
        // getMessagesFailure: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.messages[action.payload.roomId] = action.payload.data;
            // console.log('action.payload: ', action.payload);
        })
        builder.addCase(getMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
       

    }
})
export const { getMessagesSuccess } = MessagingSlice.actions;
export default MessagingSlice.reducer;