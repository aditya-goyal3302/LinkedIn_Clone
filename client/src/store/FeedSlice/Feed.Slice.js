import { createSlice } from '@reduxjs/toolkit'
import {fetchFeed, createPost} from './Feed.api'

const initialState = {
    feed: [],
    isLoading: false,
    error: null,

}

const FeepSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
    .addCase(fetchFeed.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchFeed.fulfilled, (state, action) => {
      state.isLoading = false
      state.feed = action.payload
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

export default FeepSlice.reducer