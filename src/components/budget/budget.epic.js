import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';

import { Authenticator } from '../../App.auth';
import { Encryptor } from '../../App.encryption';
import * as Actions from './budget.actions';
import { loadBudget } from './budget.actions';
import { ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from '../../routes';
import { budget as budgetSelector, month, year } from '../location';

/**
 * @param budget string
 * @param year string
 * @param month string
 * @param categoryId string
 * @param valueType string
 * @param value number
 * @returns {Promise<{plan: number, real: number}>}
 */
const saveValueAction = async (budget, year, month, categoryId, valueType, value) => {
  const encryptedValue = await Encryptor.encrypt(value.toString());
  const response = await fetch(`http://localhost:8080/budgets/${budget}/${year}/entries/${categoryId}`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      month,
      [valueType]: encryptedValue,
    }),
    method: 'PUT',
  });
  const entry = await response.json();

  return await {
    ...entry,
    plan: entry.plan ? parseFloat(await Encryptor.decrypt(entry.plan)) : 0,
    real: entry.real ? parseFloat(await Encryptor.decrypt(entry.real)) : 0
  };
};

/**
 * @param budget string
 * @param year string
 * @param month string
 * @returns {Promise<[any]>}
 */
const fetchBudget = async (budget, year, month) => {
  const response = await fetch(`http://localhost:8080/budgets/${budget}/${year}/entries/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  });
  const entries = await response.json();

  return await Promise.all(entries.map(async entry => ({
    ...entry,
    plan: entry.plan ? parseFloat(await Encryptor.decrypt(entry.plan)) : 0,
    real: entry.real ? parseFloat(await Encryptor.decrypt(entry.real)) : 0
  })));
};

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
    .concatMap(action => {
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
    .filter(action => [ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH].indexOf(action.type) !== -1)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = year(state);
      const currentMonth = month(state);
      const budget = budgetSelector(state);

      return Observable
        .from(fetchBudget(budget, currentYear, currentMonth))
        .map(entries => loadBudget(currentYear, currentMonth, entries));
    })
;

export const budgetEpic = combineEpics(
  saveBudgetEpic,
  loadBudgetEpic
);
