import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import UserSaga from './user/UserSaga';
import ExpensesSaga from './expenses/ExpensesSaga';
import BudgetSaga from './budget/BudgetSaga';
import IrregularBudgetSaga from './irregular_budget/IrregularBudgetSaga';
import * as UserAction from './user/UserAction';
import * as ExpensesActions from './expenses/ExpensesAction';
import * as BudgetActions from './budget/BudgetAction';
import * as IrregularBudgetActions from './irregular_budget/IrregularBudgetAction';

export default function* rootSaga() {
  yield all([
    takeLatest(UserAction.LOAD_USER, UserSaga.loadUser),
    takeLatest(ExpensesActions.ADD_ITEM, ExpensesSaga.addItem),
    takeLatest(ExpensesActions.SAVE_ITEM, ExpensesSaga.saveItem),
    takeLatest(ExpensesActions.REMOVE_ITEM, ExpensesSaga.removeItem),
    takeEvery(BudgetActions.SAVE_INCOME_PLANNED, BudgetSaga.savePlannedIncome),
    takeEvery(BudgetActions.SAVE_INCOME_REAL, BudgetSaga.saveRealIncome),
    takeEvery(BudgetActions.SAVE_EXPENSE_PLANNED, BudgetSaga.savePlannedExpense),
    takeEvery(BudgetActions.SAVE_EXPENSE_REAL, BudgetSaga.saveRealExpense),
    takeEvery(IrregularBudgetActions.SAVE_IRREGULAR_PLANNED, IrregularBudgetSaga.savePlannedIrregular),
  ]);
}
