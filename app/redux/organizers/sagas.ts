import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ORGANIZERS, Organizer } from "./types";
import { fetchOrganizers } from "../../services";
import { getOrganizersFailedAction, getOrganizersSuccessAction } from "./slice";

/**
 * Saga for get organizers
 */
export function* getOrganizersSaga() {
  try {
    const organizers: Organizer[] = yield call(fetchOrganizers);
    yield put(getOrganizersSuccessAction(organizers));
  } catch (error: any) {
    yield put(getOrganizersFailedAction(error.message));
  }
}

/**
 * Watcher saga for get organizers
 */
export function* watchGetOrganizers() {
  yield takeLatest(GET_ORGANIZERS, getOrganizersSaga);
}