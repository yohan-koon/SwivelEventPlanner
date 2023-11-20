import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PHOTOS, Photo } from "./types";
import { fetchPhotos } from "../../services";
import { getPhotosFailedAction, getPhotosSuccessAction } from "./slice";

/**
 * Saga for get photos
 */
function* getPhotosSaga() {
  try {
    const photos: Photo[] = yield call(fetchPhotos);
    yield put(getPhotosSuccessAction(photos));
  } catch (error: any) {
    yield put(getPhotosFailedAction(error.message));
  }
}

/**
 * Watcher saga for get photos
 */
export function* watchGetPhotos() {
  yield takeLatest(GET_PHOTOS, getPhotosSaga);
}