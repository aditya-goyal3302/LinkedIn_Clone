import { createSlice } from '@reduxjs/toolkit';
import { fetchComments, createComment, createSubComment, fetchSubComments } from './Comment.api';
const commentSlice = createSlice({
    name: "comments",
    initialState: {
        isLoading: false,
        error: null,
        content: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.isLoading = false
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.content = {
                ...state.content,
                [action.payload.postId]: action.payload.data
            }
        })
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(createComment.pending, (state) => {
            state.isLoading = false
        })
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.isLoading = false
            state.content[action.payload.postId].unshift(action.payload.data)
        })
        builder.addCase(createComment.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(createSubComment.pending, (state) => {
            state.isLoading = false
        })
        builder.addCase(createSubComment.fulfilled, (state, action) => {
            state.isLoading = false
            if (state.content[action.payload.commentId]?.length > 0)
                state.content[action.payload.commentId].unshift(action.payload.data)
            else
                state.content[action.payload.commentId] = [action.payload.data]
        })
        builder.addCase(createSubComment.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(fetchSubComments.pending, (state) => {
            state.isLoading = false
        })
        builder.addCase(fetchSubComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.content = {
                ...state.content,
                [action.payload.commentId]: action.payload.data
            }
        })
        builder.addCase(fetchSubComments.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})
export default commentSlice.reducer
                                                                                                                                                                                                                                      