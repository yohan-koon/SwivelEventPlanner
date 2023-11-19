import { all, fork } from "redux-saga/effects";
import { watchLoadExistingUser, watchSignIn, watchSignOut, watchSignUp, watchUpdateUserInfo, watchUploadUserImage } from "./user";

const rootSaga = function* () {

  yield all([
    //User sagas
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchLoadExistingUser),
    fork(watchSignOut),
    fork(watchUploadUserImage),
    fork(watchUpdateUserInfo)
  ]);
  
};

export default rootSaga;