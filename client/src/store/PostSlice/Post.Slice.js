import { createSlice } from '@reduxjs/toolkit'
import {fetchFeed, createPost} from './Post.api'

const initialState = {
    feed: [],
    isLoading: false,
    error: null,

}

const PostSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
    .addCase(fetchFeed.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchFeed.fulfilled, (state, action) => {
      if(action.payload.length > 0) 
      state.feed.push(...action.payload)
      state.isLoading = false
    })
    .addCase(fetchFeed.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    .addCase(createPost.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false
      state.feed.unshift(action.payload)
    })
    .addCase(createPost.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  }
});

// export const {} = FeepSlice.actions

export default PostSlice.reducer