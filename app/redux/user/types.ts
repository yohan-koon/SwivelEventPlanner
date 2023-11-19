import { AsyncBaseState } from "../../types"
import { ImagePickerResponse } from "react-native-image-picker";
import { User as FirebaseUser} from "firebase/auth";

export type User = {
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    address?: string,
    imageUrl?: string,
    createdAt: string,
    updatedAt?: string,
}

export type ISignUp = {} & AsyncBaseState;

export type ISignIn = {} & AsyncBaseState;

export type ILoadExistingUser = {} & AsyncBaseState;

export type ISignOut = {} & AsyncBaseState;

export type IImageUploadRequest = {
    user?: User,
    uri: string,
}

export type IUploadUserImage = {} & AsyncBaseState;

export type IUpdateUserInfo = {} & AsyncBaseState;

export type UserStateType = {
    firebaseUser: FirebaseUser | null,
    user: User | null,
    signUp: ISignUp,
    signIn: ISignIn,
    loadExistingUser: ILoadExistingUser,
    signOut: ISignOut,
    uploadUserImage: IUploadUserImage,
    updateUserInfo: IUpdateUserInfo,
}

export const USER = 'user';
export type USER = typeof USER;

export const SIGN_UP = `${USER}/signUpAction`;
export type SIGN_UP = typeof SIGN_UP;

export const SIGN_IN = `${USER}/signInAction`;
export type SIGN_IN = typeof SIGN_IN;

export const LOAD_EXISTING_USER = `${USER}/loadExistingUserAction`;
export type LOAD_EXISTING_USER = typeof LOAD_EXISTING_USER;

export const SIGN_OUT = `${USER}/signOutAction`;
export type SIGN_OUT = typeof SIGN_OUT;

export const UPLOAD_USER_IMAGE = `${USER}/uploadUserImageAction`;
export type UPLOAD_USER_IMAGE = typeof UPLOAD_USER_IMAGE;

export const UPDATE_USER_INFO = `${USER}/updateUserInfoAction`;
export type UPDATE_USER_INFO = typeof UPDATE_USER_INFO;
