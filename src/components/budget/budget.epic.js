import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import * as Actions from './budget.actions';

const saveChanges = (data, loaderType, successType, errorType) => {
  // TODO: Replace this with proper request handling
  return Observable
    .of({
      type: successType,
      payload: data
    })
    .delay(1000)
    .startWith({
      type: loaderType,
      payload: data,
    });
  // errorType
};

const plannedIncomeEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_INCOME_PLANNED)
    .concatMap((action) => saveChanges(
      action.payload,
      Actions.UPDATE_INCOME_PLANNED,
      Actions.INCOME_PLANNED_SAVE_SUCCESS,
      Actions.INCOME_PLANNED_SAVE_FAIL,
    ))
;
const realIncomeEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_INCOME_REAL)
    .concatMap((action) => saveChanges(
      action.payload,
      Actions.UPDATE_INCOME_REAL,
      Actions.INCOME_REAL_SAVE_SUCCESS,
      Actions.INCOME_REAL_SAVE_FAIL,
    ))
;
const plannedExpenseEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_EXPENSE_PLANNED)
    .concatMap((action) => saveChanges(
      action.payload,
      Actions.UPDATE_EXPENSE_PLANNED,
      Actions.EXPENSE_PLANNED_SAVE_SUCCESS,
      Actions.EXPENSE_PLANNED_SAVE_FAIL,
    ))
;
const realExpenseEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_EXPENSE_REAL)
    .concatMap((action) => saveChanges(
      action.payload,
      Actions.UPDATE_EXPENSE_REAL,
      Actions.EXPENSE_REAL_SAVE_SUCCESS,
      Actions.EXPENSE_REAL_SAVE_FAIL,
    ))
;

export const budgetEpic = combineEpics(
  plannedIncomeEpic,
  realIncomeEpic,
  plannedExpenseEpic,
  realExpenseEpic
);
