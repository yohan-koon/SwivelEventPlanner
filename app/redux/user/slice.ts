import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IImageUploadRequest, User, UserStateType } from "./types";
import { LoginFormValues, SignUpFormValues } from "../../screens";
import { User as FirebaseUser } from "firebase/auth";

const initialState : UserStateType = {
    firebaseUser: null,
    user: null,
    signUp: {
        loading: 'idle',
        error: null,
    },
    signIn: {
        loading: 'idle',
        error: null,
    },
    loadExistingUser: {
        loading: 'idle',
        error: null,
    },
    signOut: {
        loading: 'idle',
        error: null,
    },
    uploadUserImage: {
        loading: 'idle',
        error: null,
    },
    updateUserInfo: {
        loading: 'idle',
        error: null,
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirebaseUser: (state: UserStateType, action: PayloadAction<FirebaseUser | null>) => {
            state.firebaseUser = action.payload;
        },
        signUpAction: (state: UserStateType, action: PayloadAction<SignUpFormValues>) => {
            state.signUp.loading = 'loading';
            state.signUp.error = null;
        },
        signUpSuccessAction: (state: UserStateType, action: PayloadAction<User>) => {
            state.signUp.loading = 'succeeded';
            state.user = action.payload;
        },
        signUpFailedAction: (state: UserStateType, action: PayloadAction<string>) => {
            state.signUp.loading = 'failed';
            state.signUp.error = action.payload;
        },
        signInAction: (state: UserStateType, action: PayloadAction<LoginFormValues>) => {
            state.signIn.loading = 'loading';
            state.signIn.error = null;
        },
        signInSuccessAction: (state: UserStateType) => {
            state.signIn.loading = 'succeeded';
        },
        signInFailedAction: (state: UserStateType, action: PayloadAction<string>) => {
            state.signIn.loading = 'failed';
            state.signIn.error = action.payload;
        },
        loadExistingUserAction: (state: UserStateType, action: PayloadAction<string>) => {
            state.loadExistingUser.loading = 'loading';
            state.loadExistingUser.error = null;
        },
        loadExistingUserSuccessAction: (state: UserStateType, action: PayloadAction<User>) => {
            state.loadExistingUser.loading = 'succeeded';
            state.user = action.payload;
        },
        loadExistingUserFailedAction: (state: UserStateType, action: PayloadAction<string>) => {
            state.loadExistingUser.loading = 'failed';
            state.loadExistingUser.error = action.payload;
        },
        signOutAction: (state: UserStateType) => {
            state.signOut.loading = 'loading';
            state.signOut.error = null;
        },
        signOutSuccessAction: (state: UserStateType) => {
            state.signOut.loading = 'succeeded';
            state.user = null;
            state.firebaseUser = null;
        },
        signOutFailedAction: (state: UserStateType, action: PayloadAction<string>) => {
            state.signOut.loading = 'failed';
            state.signOut.error = action.payload;
        },
        uploadUserImageAction: (state: UserStateType, action: PayloadAction<IImageUploadRequest>) => {
            state.uploadUserImage.loading = 'loading';
            state.uploadUserImage.error = null;
        },
        uploadUserImageSuccessAction: (state: UserStateType, action: PayloadAction<User>) => {
            state.uploadUserImage.loading = 'succeeded';
            state.user = action.payload;
        },
        uploadUserImageFailedAction: (state: UserStateType, action: PayloadAction<string>) => {
            state.uploadUserImage.loading = 'failed';
            state.uploadUserImage.error = action.payload;
        },
        updateUserInfoAction: (state: UserStateType, action: PayloadAction<User>) => {
            state.updateUserInfo.loading = 'loading';
            state.updateUserInfo.error = null;
        },
        updateUserInfoSuccessAction: (state: UserStateType, action: PayloadAction<User>) => {
            state.updateUserInfo.loading = 'succeeded';
            state.user = action.payload;
        },
        updateUserInfoFailedAction: (state: UserStateType, action: PayloadAction<string>) => {
            state.updateUserInfo.loading = 'failed';
            state.updateUserInfo.error = action.payload;
        },
    }
})

export const {
    setFirebaseUser,
    signUpAction,
    signUpSuccessAction,
    signUpFailedAction,
    signInAction,
    signInSuccessAction,
    signInFailedAction,
    loadExistingUserAction,
    loadExistingUserSuccessAction,
    loadExistingUserFailedAction,
    signOutAction,
    signOutSuccessAction,
    signOutFailedAction,
    uploadUserImageAction,
    uploadUserImageSuccessAction,
    uploadUserImageFailedAction,
    updateUserInfoAction,
    updateUserInfoSuccessAction,
    updateUserInfoFailedAction,
} = userSlice.actions;

export default userSlice.reducer;