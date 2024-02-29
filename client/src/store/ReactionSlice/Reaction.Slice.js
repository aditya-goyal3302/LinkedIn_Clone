import { createSlice } from '@reduxjs/toolkit';
import { addPostReaction, fetchCommentsReactions, fetchPostReactions,addCommentReaction } from './Reaction.api';

const initialState = {
    reactions: {
        post: {
            //userId:{}
        },
        comment: {}
    },
    loading: false,
    error: null
}

const reactionSlice = createSlice({
    name: 'reaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostReactions.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostReactions.fulfilled, (state, action) => {
                // console.log('action: ', action.payload.data);
                state.loading = false;
                let data ={}
                action.payload.data.data.forEach((item)=>{
                    data[item.user_id._id] = item
                })
                state.reactions={
                    comment:{...state.reactions.comment},
                    post: {
                        ...state.reactions.post,
                        [action.payload.postId]: data
                    }
                }
            })
            .addCase(fetchPostReactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(fetchCommentsReactions.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentsReactions.fulfilled, (state, action) => {
                state.loading = false;
                let data ={}
                action.payload.data.data.forEach((item)=>{
                    data[item.user_id._id] = item
                })
                state.reactions={
                    comment:{
                        ...state.reactions.comment,
                        [action.payload.commentId]: data
                    },
                    post: {...state.reactions.post}
                }
            })
            .addCase(fetchCommentsReactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

            .addCase(addPostReaction.pending, (state, action) => {
                // console.log('addPostReaction.pending: ', );
                state.loading = true;
                state.error = null;
            })
            .addCase(addPostReaction.fulfilled, (state, action) => {
                // console.log('addPostReaction.fulfilled: ', );
                // console.log('action.payload: ', action.payload.response);
                state.loading = false;
                state.reactions={
                    comment:{...state.reactions.comment},
                    post: {
                        ...state.reactions.post,
                        [action.payload.postId]: {
                            ...state.reactions.post[action.payload.postId],
                            [action.payload.response.data.user_id._id]: action.payload.response.data
                        }
                    }
                }
                if(action.payload.response.data.is_deleted) delete state.reactions.post[action.payload.postId][action.payload.response.data.user_id._id]
            })
            .addCase(addPostReaction.rejected, (state, action) => {
                // console.log('addPostReaction.rejected: ', );
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addCommentReaction.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCommentReaction.fulfilled, (state, action) => {
                state.loading = false;
                state.reactions={
                    comment:{
                        ...state.reactions.comment,
                        [action.payload.commentId]: {
                            ...state.reactions.comment[action.payload.commentId],
                            [action.payload.response.data.user_id._id]: action.payload.response.data
                        }
                    },
                    post: {...state.reactions.post}
                }
                if(action.payload.response.data.is_deleted) delete state.reactions.comment[action.payload.commentId][action.payload.response.data.user_id._id]
            })
            .addCase(addCommentReaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })

    }
})

export default reactionSlice.reducer;