import { configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import articleReducer from './features/articles/articleSlice'

export const store  = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//export type AppStore = typeof store

export default store;