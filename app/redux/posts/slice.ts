import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Comment, Post, PostsStateType } from "./types";

const initialState : PostsStateType = {
    posts: [],
    getPosts: {
        loading: 'idle',
        error: null,
    }
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPostsAction: (state: PostsStateType) => {
            state.getPosts.loading = 'loading';
            state.getPosts.error = null;
        },
        getPostsSuccessAction: (state: PostsStateType, action: PayloadAction<Post[]>) => {
            state.getPosts.loading = 'succeeded';
            state.posts = action.payload;
        },
        getPostsFailedAction: (state: PostsStateType, action) => {
            state.getPosts.loading = 'failed';
            state.getPosts.error = action.payload;
        }
    }
})

export const {
    getPostsAction,
    getPostsSuccessAction,
    getPostsFailedAction,
} = postsSlice.actions;

export default postsSlice.reducer;