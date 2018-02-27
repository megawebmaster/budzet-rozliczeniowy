import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import * as Actions from './budget.actions';
import { ROUTE_BUDGET_MONTH } from '../../routes';
import { month, year } from '../location';
import { loadBudget } from './budget.actions';

const saveValueAction = (year, month, categoryId, valueType, value) => (
  fetch(`http://localhost:8080/budgets/${year}/entries/${categoryId}`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *omit
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      month,
      [valueType]: value,
    }),
    method: 'PUT',
    // mode: 'cors', // no-cors, *same-origin
  }).then(response => response.json())
);

const fetchBudget = (year, month) => (
  fetch(`http://localhost:8080/budgets/${year}/entries/${month}`).then(response => response.json())
);

const saveChanges = (data, loaderType, successType, errorType) => {
  const { year, month, categoryId, valueType, value } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(saveValueAction(year, month, categoryId, valueType, value))
    .map(() => ({
      type: successType,
      payload: data
    }))
    .startWith({
      type: loaderType,
      payload: data,
    });
  // errorType
};

const saveBudgetEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_BUDGET)
    .concatMap((action) => saveChanges(
      action.payload,
      Actions.SAVING_BUDGET,
      Actions.SAVE_SUCCESS,
      Actions.SAVE_FAIL,
    ))
;

const loadBudgetEpic = (action$, store) =>
  action$
    .ofType(ROUTE_BUDGET_MONTH)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = year(state);
      const currentMonth = month(state);

      return Observable
        .from(fetchBudget(currentYear, currentMonth))
        .map(values => loadBudget(currentYear, currentMonth, values));
    })
;

export const budgetEpic = combineEpics(
  saveBudgetEpic,
  loadBudgetEpic
);
