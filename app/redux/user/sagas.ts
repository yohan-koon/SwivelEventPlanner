import { PayloadAction } from "@reduxjs/toolkit";
import { LoginFormValues, SignUpFormValues } from "../../screens";
import { call, put, takeLatest } from "redux-saga/effects";
import { loadExistingUserFailedAction, loadExistingUserSuccessAction, signInFailedAction, signInSuccessAction, signOutFailedAction, signOutSuccessAction, signUpFailedAction, signUpSuccessAction, updateUserInfoFailedAction, updateUserInfoSuccessAction, uploadUserImageFailedAction, uploadUserImageSuccessAction } from "./slice";
import { loginWithEmailAndPassword, logout, signUpWithEmailAndPassword } from "../../services";
import { IImageUploadRequest, LOAD_EXISTING_USER, SIGN_IN, SIGN_OUT, SIGN_UP, UPDATE_USER_INFO, UPLOAD_USER_IMAGE, User } from "./types";
import { getUser, saveOrUpdateUser } from "../../services/firebase/userService";
import { uploadImage } from "../../services/firebase/storageService";

/**
 * Saga for Sign Up
 */
function* signUp(action: PayloadAction<SignUpFormValues>) {
  try {
    const { email, password } = action.payload;
    const user: User =  yield call(signUpWithEmailAndPassword, email, password);
    yield put(signUpSuccessAction(user));
  } catch (error: any) {
    yield put(signUpFailedAction(error.message));
  }
}

/**
 * Watcher saga for Sign Up
 */
export function* watchSignUp() {
  yield takeLatest(SIGN_UP, signUp);
}

/**
 * Saga for load existing user
 */
function* loadExistingUser(action: PayloadAction<string>) {
  try {
    const user: User =  yield call(getUser, action.payload);
    yield put(loadExistingUserSuccessAction(user));
  } catch (error: any) {
    yield put(loadExistingUserFailedAction(error.message));
  }
}

/**
 * Watcher saga for load existing user
 */
export function* watchLoadExistingUser() {
  yield takeLatest(LOAD_EXISTING_USER, loadExistingUser);
}

/**
 * Saga for Sign Out
 */
function* signOut() {
  try {
    yield call(logout);
    yield put(signOutSuccessAction());
  } catch (error: any) {
    yield put(signOutFailedAction(error.message));
  }
}

/**
 * Watcher saga for Sign Out
 */
export function* watchSignOut() {
  yield takeLatest(SIGN_OUT, signOut);
}

/**
 * Saga for Image Upload
 */
function* uploadUserImage(action: PayloadAction<IImageUploadRequest>) {
    try {
        const {user, uri} = action.payload;
        const imageUploadRequest = action.payload;
        const imageUrl: string = yield call(uploadImage, imageUploadRequest);
        const updateResponse : User = yield call(saveOrUpdateUser, {...user, imageUrl} as User);
        yield put(uploadUserImageSuccessAction(updateResponse));
    }catch (error: any) {
        yield put(uploadUserImageFailedAction(error.message));
    }
}

/**
 * Watcher saga for Image Upload
 */
export function* watchUploadUserImage() {
    yield takeLatest(UPLOAD_USER_IMAGE, uploadUserImage);
}

/**
 * Saga for updating user info
 */
export function* updateUserInfo(action: PayloadAction<User>) {
    try {
        const user: User = action.payload;
        const updateResponse : User = yield call(saveOrUpdateUser, user);
        yield put(updateUserInfoSuccessAction(updateResponse));
    }catch (error: any) {
        yield put(updateUserInfoFailedAction(error.message));
    }
}

/**
 * Watcher saga for updating user info
 */
export function* watchUpdateUserInfo() {
    yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
}

/**
 * Saga for sign in
 */
function* signIn(action: PayloadAction<LoginFormValues>) {
  try {
    const { email, password } = action.payload;
    const user: User =  yield call(loginWithEmailAndPassword, email, password);
    yield put(signInSuccessAction());
  } catch (error: any) {
    yield put(signInFailedAction(error.message));
  }
}


/**
 * Watcher saga for sign in
 */
export function* watchSignIn() {
  yield takeLatest(SIGN_IN, signIn);
}
