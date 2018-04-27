import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import { budget, year } from '../location';
import { loadIrregularBudget } from './irregular-budget.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';
import * as Actions from './irregular-budget.actions';
import { Authenticator } from '../../App.auth';

const saveIrregularValueAction = (budget, year, categoryId, valueType, value) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/irregular/${categoryId}`, {
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

const fetchIrregularBudget = (budget, year) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/irregular`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  }).then(response => response.json())
);

const saveIrregularChanges = (data, loaderType, successType, errorType) => {
  const { budget, year, categoryId, value } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(saveIrregularValueAction(budget, year, categoryId, 'planned', value))
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

const saveIrregularBudgetEpic = (action$, store) =>
  action$
    .ofType(Actions.SAVE_IRREGULAR_BUDGET)
    .concatMap((action) => {
      const state = store.getState();
      return saveIrregularChanges(
        {
          ...action.payload,
          year: year(state),
          budget: budget(state),
        },
        Actions.SAVING_IRREGULAR_BUDGET,
        Actions.SAVE_IRREGULAR_SUCCESS,
        Actions.SAVE_IRREGULAR_FAIL,
      )
    })
;

const loadIrregularBudgetEpic = (action$, store) =>
  action$
    .ofType(ROUTE_BUDGET_IRREGULAR)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = year(state);
      const currentBudget = budget(state);

      return Observable
        .from(fetchIrregularBudget(currentBudget, currentYear))
        .map(values => loadIrregularBudget(currentYear, values));
    })
;

export const irregularBudgetEpic = combineEpics(
  saveIrregularBudgetEpic,
  loadIrregularBudgetEpic
);
