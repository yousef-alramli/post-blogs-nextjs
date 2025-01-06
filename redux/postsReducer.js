import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    value: []
  },
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload;
    },
    clearPosts: state => {
      state.value = [];
    },
  }
});

export const { setPosts, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;

