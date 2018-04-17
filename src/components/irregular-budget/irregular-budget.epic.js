import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import { year } from '../location';
import { loadIrregularBudget } from './irregular-budget.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';
import * as Actions from './irregular-budget.actions';
import { Authenticator } from '../../App.auth';

const saveIrregularValueAction = (year, categoryId, valueType, value) => (
  fetch(`http://localhost:8080/budgets/${year}/irregular/${categoryId}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      [valueType]: value,
    }),
    method: 'PUT',
  }).then(response => response.json())
);

const fetchIrregularBudget = (year) => (
  fetch(`http://localhost:8080/budgets/${year}/irregular`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  }).then(response => response.json())
);

const saveIrregularChanges = (data, loaderType, successType, errorType) => {
  const { year, categoryId, value } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(saveIrregularValueAction(year, categoryId, 'planned', value))
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

const saveIrregularBudgetEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_IRREGULAR_BUDGET)
    .concatMap((action) => saveIrregularChanges(
      action.payload,
      Actions.SAVING_IRREGULAR_BUDGET,
      Actions.SAVE_IRREGULAR_SUCCESS,
      Actions.SAVE_IRREGULAR_FAIL,
    ))
;

const loadIrregularBudgetEpic = (action$, store) =>
  action$
    .ofType(ROUTE_BUDGET_IRREGULAR)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = year(state);

      return Observable
        .from(fetchIrregularBudget(currentYear))
        .map(values => loadIrregularBudget(currentYear, values));
    })
;

export const irregularBudgetEpic = combineEpics(
  saveIrregularBudgetEpic,
  loadIrregularBudgetEpic
);
