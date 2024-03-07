import { createAsyncThunk } from"@reduxjs/toolkit"
import axios from "axios";

export const fetchMyConnections = createAsyncThunk(
    "myConnections/fetchMyConnections",
    async (payload, {rejectWithValue,getState}) => {
        try {
            const state = getState();
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/connections`,
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: state.persistedReducer.token,
                    },
                }
            );
            return response.data;
        } catch (error) {
        return rejectWithValue({ error });
        }
    }
);

export const fetchRequests = createAsyncThunk(
    "myConnections/fetchRequests",
    async (payload, {rejectWithValue,getState}) => {
        try {
            const state = getState();
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/connections/pending`,
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: state.persistedReducer.token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({ error });
        }
    }
);

export const fetchSuggessions = createAsyncThunk(
    "myConnections/fetchSuggessions",
    async (payload, {rejectWithValue,getState}) => {
        try {
            const state = getState();
            const response = await axios.get(`${process.env.REACT_APP_IMG_BASE_URL}/connections/suggestions`,
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: state.persistedReducer.token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({ error });
        }
    }
);

export const sendConnectionRequest = createAsyncThunk(
    "myConnections/sendConnectionRequest",
    async (payload, {rejectWithValue,getState}) => {
        try {
            const state = getState();
            const response = await axios.post(`${process.env.REACT_APP_IMG_BASE_URL}/connections`, {requested_user_id:payload},
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: state.persistedReducer.token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue( error ,payload);
        }
    }
);

export const responseConnectionRequest = createAsyncThunk(
    "myConnections/responseConnectionRequest",
    async (payload, {rejectWithValue,getState}) => {
        try {
            const { id, requested_by, status} = payload;
            const state = getState();
            const response = await axios.put(`${process.env.REACT_APP_IMG_BASE_URL}/connections/${id}`, {requested_by:requested_by, status:status},
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: state.persistedReducer.token,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({ error });
        }
    }
);