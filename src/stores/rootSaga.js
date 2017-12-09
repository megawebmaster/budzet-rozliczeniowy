import { all, takeLatest } from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import SpendingSaga from './spending/SpendingSaga';
import * as UserAction from './user/UserAction';
import * as SpendingActions from './spending/SpendingAction';

export default function* rootSaga() {
  yield all([
    takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
    takeLatest(SpendingActions.ADD_ITEM, SpendingSaga.addItem),
    takeLatest(SpendingActions.SAVE_ITEM, SpendingSaga.saveItem),
    takeLatest(SpendingActions.REMOVE_ITEM, SpendingSaga.removeItem),
  ]);
}
