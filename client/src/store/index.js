import { configureStore } from '@reduxjs/toolkit';
import login_reducer from './LoginSlice/Login.Slice';
import signup_reducer from './SignupSlice/Signup.Slice';
import Post_reducer from './PostSlice/Post.Slice';
import commentReducer from './CommentSlice/Comment.Slice';
import reactionReducer from './ReactionSlice/Reaction.Slice';
import myConnectionReducer from './MyConnections/MyConnection.Slice';
import MessagingReducer from './MessagingSlice/Messaging.Slice';
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
        reactionReducer,
        myConnectionReducer,
        MessagingReducer
    },
    middleware: getDefaultMiddleware=> getDefaultMiddleware({
      serializableCheck: false
    })

})
export const persistor = persistStore(store)
