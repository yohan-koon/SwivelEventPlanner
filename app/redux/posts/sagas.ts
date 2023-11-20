import { call, put, takeLatest } from "redux-saga/effects";
import { Comment, GET_POSTS, Post } from "./types";
import { fetchComments, fetchPosts } from "../../services";
import { getPostsFailedAction, getPostsSuccessAction } from "./slice";

/**
 * Saga for get posts
 */
function* getPostsSaga() {
  try {
    const posts: Post[] = yield call(fetchPosts);
    const comments: Comment[] = yield call(fetchComments);
    posts.forEach((post: Post) => {
      post.comments = comments.filter((comment: Comment) => comment.postId === post.id);
    });
    yield put(getPostsSuccessAction(posts));
  } catch (error: any) {
    yield put(getPostsFailedAction(error.message));
  }
}

/**
 * Watcher saga for get posts
 */
export function* watchGetPosts() {
  yield takeLatest(GET_POSTS, getPostsSaga);
}