import { configureStore } from '@reduxjs/toolkit';
import login_reducer from './LoginSlice/LoginSlice';
import signup_reducer from './SignupSlice/SignupSlice';
import Post_reducer from './PostSlice/Post.Slice';
import commentReducer from './CommentSlice/Comment.Slice';
import reactionReducer from './ReactionSlice/Reaction.Slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, login_reducer)

export const store = configureStore({
    reducer: {
        persistedReducer,
        signup_reducer,
        Post_reducer,
        commentReducer,
        reactionReducer
    },
    // middleware: [thunk]

})
export const persistor = persistStore(store)
