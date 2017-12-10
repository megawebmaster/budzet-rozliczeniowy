import { all, takeLatest } from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import ExpensesSaga from './expenses/ExpensesSaga';
import * as UserAction from './user/UserAction';
import * as ExpensesActions from './expenses/ExpensesAction';

export default function* rootSaga() {
  yield all([
    takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
    takeLatest(ExpensesActions.ADD_ITEM, ExpensesSaga.addItem),
    takeLatest(ExpensesActions.SAVE_ITEM, ExpensesSaga.saveItem),
    takeLatest(ExpensesActions.REMOVE_ITEM, ExpensesSaga.removeItem),
  ]);
}
