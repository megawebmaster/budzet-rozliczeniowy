import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';

import { Authenticator } from '../../App.auth';
import * as Actions from './budget.actions';
import { loadBudget } from './budget.actions';
import { ROUTE_BUDGET_MONTH } from '../../routes';
import { budget as budgetSelector, month, year } from '../location';

const saveValueAction = (budget, year, month, categoryId, valueType, value) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/entries/${categoryId}`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      month,
      [valueType]: value,
    }),
    method: 'PUT',
  }).then(response => response.json())
);

const fetchBudget = (budget, year, month) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/entries/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  }).then(response => response.json())
);

const saveChanges = (data, loaderType, successType, errorType) => {
  const { budget, year, month, categoryId, valueType, value } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(saveValueAction(budget, year, month, categoryId, valueType, value))
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

const saveBudgetEpic = (action$, store) =>
  action$
    .ofType(Actions.SAVE_BUDGET)
    .concatMap((action) => {
      const state = store.getState();

      return saveChanges(
        {
          ...action.payload,
          budget: budgetSelector(state),
          year: year(state),
          month: month(state),
        },
        Actions.SAVING_BUDGET,
        Actions.SAVE_SUCCESS,
        Actions.SAVE_FAIL,
      )
    })
;

const loadBudgetEpic = (action$, store) =>
  action$
    .ofType(ROUTE_BUDGET_MONTH)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = year(state);
      const currentMonth = month(state);
      const budget = budgetSelector(state);

      return Observable
        .from(fetchBudget(budget, currentYear, currentMonth))
        .map(values => loadBudget(currentYear, currentMonth, values));
    })
;

export const budgetEpic = combineEpics(
  saveBudgetEpic,
  loadBudgetEpic
);
