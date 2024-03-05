import { createSlice } from "@reduxjs/toolkit"
import { fetchMyConnections, fetchRequests, fetchSuggessions, responseConnectionRequest, acceptConnectionRequest, sendConnectionRequest } from "./MyConnection.Api"

const initialState = {
    myConnections: [],
    requests:[],
    Suggessions:[],
    loading: {},
    error: {},
}

const myConnectionSlice = createSlice({
    name: "myConnections",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchMyConnections.pending, (state, action) => {
            state.loading.fetchMyConnections = true;
        })
        .addCase(fetchMyConnections.fulfilled, (state, action) => {
            state.loading.fetchMyConnections = false;
            state.myConnections = action.payload;
        })
        .addCase(fetchMyConnections.rejected, (state, action) => {
            state.loading.fetchMyConnections = false;
            state.error.fetchMyConnections = action.payload.error;
        })
        .addCase(fetchRequests.pending, (state, action) => {
            state.loading.fetchRequests = true;
        })
        .addCase(fetchRequests.fulfilled, (state, action) => {
            state.loading.fetchRequests = false;
            state.requests = action.payload;
        })
        .addCase(fetchRequests.rejected, (state, action) => {
            state.loading.fetchRequests = false;
            console.log('action.payload: ', action.payload.error.response.status);
            if(action.payload.error.response.status === 404) state.requests = [];
            else state.error.fetchRequests = action.payload.error;
            // state.error = action.payload.error;
        })
        .addCase(fetchSuggessions.pending, (state, action) => {
            state.loading.fetchSuggessions = true;
        })
        .addCase(fetchSuggessions.fulfilled, (state, action) => {
            state.loading.fetchSuggessions = false;
            state.Suggessions = action.payload;
        })
        .addCase(fetchSuggessions.rejected, (state, action) => {
            state.loading.fetchSuggessions = false;
            state.error.fetchSuggessions = action.payload.error;
        })
        .addCase(responseConnectionRequest.pending, (state, action) => {
            state.loading.responseConnectionRequest = true;
        })
        .addCase(responseConnectionRequest.fulfilled, (state, action) => {
            state.loading.responseConnectionRequest = false;
            // state.myConnections = action.payload;
        })
        .addCase(responseConnectionRequest.rejected, (state, action) => {
            state.loading.responseConnectionRequest = false;
            state.error.responseConnectionRequest = action.payload.error;
        })
        .addCase(sendConnectionRequest.pending, (state, action) => {
            state.loading.sendConnectionRequest = true;
        })  
        .addCase(sendConnectionRequest.fulfilled, (state, action) => {
            state.loading.sendConnectionRequest = false;
            // state.myConnections = action.payload;
        })
        .addCase(sendConnectionRequest.rejected, (state, action) => {
            state.loading.sendConnectionRequest = false;
            state.error.sendConnectionRequest = action.payload.error;
            console.log('action.payload.error: ', action.payload);
        })

    }
});

export default myConnectionSlice.reducer;