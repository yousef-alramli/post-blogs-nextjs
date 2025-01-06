import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsReducer';
import loadingReducer from './loadingReducer';

export const reducerStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      isLoading: loadingReducer,
    }
  });
}
