import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import { budget, year } from '../location';
import * as Actions from './irregular-budget.actions';
import { addIrregularBudgetError, clearIrregularBudgetErrors, loadIrregularBudget } from './irregular-budget.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';
import { Authenticator } from '../../App.auth';
import { Encryptor } from '../../App.encryption';

/**
 * @param budget string
 * @param year string
 * @param categoryId number
 * @param value number
 * @returns {Promise<{plan: number, real: number}>}
 */
const saveIrregularValueAction = async (budget, year, categoryId, value) => {
  const encryptedValue = await Encryptor.encrypt(value.toString());
  const encryptedMonthlyValue = await Encryptor.encrypt((value / 10.0).toString());
  const response = await fetch(`http://localhost:8080/budgets/${budget}/${year}/irregular/${categoryId}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      planned: encryptedValue,
      planned_monthly: encryptedMonthlyValue,
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
 * @returns {Promise}
 */
const fetchIrregularBudget = async (budget, year) => {
  const response = await fetch(`http://localhost:8080/budgets/${budget}/${year}/irregular`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return Promise.all(result.map(async entry => ({
    ...entry,
    plan: entry.plan ? parseFloat(await Encryptor.decrypt(entry.plan)) : 0,
    real: entry.real ? parseFloat(await Encryptor.decrypt(entry.real)) : 0
  })));
};

const saveIrregularChanges = (data, loaderType, successType, errorType) => {
  const { budget, year, categoryId, value } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(saveIrregularValueAction(budget, year, categoryId, value))
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
        .map(values => loadIrregularBudget(currentYear, values))
        .catch(error => Observable.of(addIrregularBudgetError(error.message)));
    })
;

const clearIrregularBudgetErrorsEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .map(() => clearIrregularBudgetErrors())
;

export const irregularBudgetEpic = combineEpics(
  saveIrregularBudgetEpic,
  loadIrregularBudgetEpic,
  clearIrregularBudgetErrorsEpic,
);
