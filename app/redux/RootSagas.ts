import { all, fork } from "redux-saga/effects";
import { watchLoadExistingUser, watchSignIn, watchSignOut, watchSignUp, watchUpdateUserInfo, watchUploadUserImage } from "./user";
import { watchGetPhotos } from "./photos";
import { watchGetOrganizers } from "./organizers/sagas";
import { watchGetPosts } from "./posts";

const rootSaga = function* () {

  yield all([
    //User sagas
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchLoadExistingUser),
    fork(watchSignOut),
    fork(watchUploadUserImage),
    fork(watchUpdateUserInfo),
    //Photos Sagas
    fork(watchGetPhotos),
    //Organizers Sagas
    fork(watchGetOrganizers),
    //Posts Sagas
    fork(watchGetPosts),
  ]);
  
};

export default rootSaga;