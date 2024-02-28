import { configureStore } from '@reduxjs/toolkit';
import login_reducer from './LoginSlice/LoginSlice';
import signup_reducer from './SignupSlice/SignupSlice';
import Post_reducer from './PostSlice/Post.Slice';
import commentReducer from './CommentSlice/Comment.Slice';
import reactionReducer from './ReactionSlice/Reaction.Slice';
import myConnectionReducer from './MyConnections/MyConnectionSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { getDefaultMiddleware } from '@reduxjs/toolkit';



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
        reactionReducer,
        myConnectionReducer
    },
    middleware: getDefaultMiddleware=> getDefaultMiddleware({
      serializableCheck: false
    })

})
export const persistor = persistStore(store)
