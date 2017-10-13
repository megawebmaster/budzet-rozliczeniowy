import { all, takeLatest } from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import * as UserAction from './user/UserAction';

export default function* rootSaga() {
  yield all([
    takeLatest(UserAction.LOAD_USER, UserSaga.loadUser)
  ]);
}
