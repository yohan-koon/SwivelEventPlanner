import { AsyncBaseState } from "../../types"

export type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export type IGetPhotos = {} & AsyncBaseState;

export type PhotosStateType = {
    photos: Photo[],
    getPhotos: IGetPhotos,
}

export const PHOTOS = 'photos';
export type PHOTOS = typeof PHOTOS;

export const GET_PHOTOS = `${PHOTOS}/getPhotosAction`;
export type GET_PHOTOS = typeof GET_PHOTOS;