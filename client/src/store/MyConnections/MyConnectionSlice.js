import { createSlice } from "@reduxjs/toolkit"
import { fetchMyConnections, fetchRequests, fetchSuggessions, responseConnectionRequest, acceptConnectionRequest, sendConnectionRequest } from "./MyConnectionThunk"

const initialState = {
    myConnections: [],
    requests:[],
    Suggessions:[],
    loading: false,
    error: null,
}

const myConnectionSlice = createSlice({
    name: "myConnections",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchMyConnections.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchMyConnections.fulfilled, (state, action) => {
            state.loading = false;
            state.myConnections = action.payload;
        })
        .addCase(fetchMyConnections.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
        .addCase(fetchRequests.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchRequests.fulfilled, (state, action) => {
            state.loading = false;
            state.requests = action.payload;
        })
        .addCase(fetchRequests.rejected, (state, action) => {
            state.loading = false;
            console.log('action.payload: ', action.payload.error.response.status);
            if(action.payload.error.response.status === 404) state.requests = [];
            else state.error = action.payload.error;
            // state.error = action.payload.error;
        })
        .addCase(fetchSuggessions.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(fetchSuggessions.fulfilled, (state, action) => {
            state.loading = false;
            state.Suggessions = action.payload;
        })
        .addCase(fetchSuggessions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
        .addCase(responseConnectionRequest.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(responseConnectionRequest.fulfilled, (state, action) => {
            state.loading = false;
            // state.myConnections = action.payload;
        })
        .addCase(responseConnectionRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
        .addCase(sendConnectionRequest.pending, (state, action) => {
            state.loading = true;
        })  
        .addCase(sendConnectionRequest.fulfilled, (state, action) => {
            state.loading = false;
            // state.myConnections = action.payload;
        })
        .addCase(sendConnectionRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })

    }
});

export default myConnectionSlice.reducer;