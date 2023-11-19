import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Photo, PhotosStateType } from "./types";

const initialState : PhotosStateType = {
    photos: [],
    getPhotos: {
        loading: 'idle',
        error: null,
    },
}

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        getPhotosAction: (state: PhotosStateType) => {
            state.getPhotos.loading = 'loading';
            state.getPhotos.error = null;
        },
        getPhotosSuccessAction: (state: PhotosStateType, action: PayloadAction<Photo[]>) => {
            state.getPhotos.loading = 'succeeded';
            state.photos = action.payload;
        },
        getPhotosFailedAction: (state: PhotosStateType, action) => {
            state.getPhotos.loading = 'failed';
            state.getPhotos.error = action.payload;
        },
    }
})

export const {
    getPhotosAction,
    getPhotosSuccessAction,
    getPhotosFailedAction,
} = photosSlice.actions;

export default photosSlice.reducer;