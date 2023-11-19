import { AsyncBaseState } from "../../types"

export type Post = {
    id: number,
    title: string,
    body: string,
    userId: number,
    comments: Comment[],
}

export type Comment = {
    id: number,
    name: string,
    email: string,
    body: string,
    postId: number,
}

export type IGetPosts = {} & AsyncBaseState;

export type PostsStateType = {
    posts: Post[],
    getPosts: IGetPosts,
}

export const POSTS = 'posts';
export type POSTS = typeof POSTS;

export const GET_POSTS = `${POSTS}/getPostsAction`;
export type GET_POSTS = typeof GET_POSTS;