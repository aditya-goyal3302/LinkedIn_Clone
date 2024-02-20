import { createSlice } from '@reduxjs/toolkit'
import {fetchFeed} from './Feed.Thunk'

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
  }
});

// export const {} = FeepSlice.actions

export default FeepSlice.reducer