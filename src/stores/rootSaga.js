import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { BudgetSaga } from '../components/budget';
import { ExpensesSaga } from '../components/expenses';
import { IrregularBudgetSaga } from '../components/irregular-budget';
import * as BudgetActions from '../components/budget';
import * as ExpensesActions from '../components/expenses';
import * as IrregularBudgetActions from '../components/irregular-budget';

export default function* rootSaga() {
  yield all([
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
