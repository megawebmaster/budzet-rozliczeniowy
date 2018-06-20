import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';

import { Authenticator } from '../../App.auth';
import { Encryptor, handleEncryptionError2 } from '../../App.encryption';
import * as Actions from './budget.actions';
import {
  addBudgetError,
  clearBudgetErrors,
  DECRYPT_BUDGET,
  decryptBudget,
  LOAD_ENCRYPTED_BUDGET,
  loadBudget,
  updateBudgetEntry
} from './budget.actions';
import { ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from '../../routes';
import { budget as budgetSelector, month as monthSelector, year as yearSelector } from '../location';
import { DECRYPT_BUDGET_ENTRY } from './budget.actions';
import { decryptBudgetEntry } from './budget.actions';
import { requirePassword } from '../password-requirement';

/**
 * @param budget string
 * @param year string
 * @param month string
 * @param categoryId string
 * @param valueType string
 * @param value number
 * @returns {Promise<boolean>}
 */
const saveValueAction = async (budget, year, month, categoryId, valueType, value) => {
  const encryptedValue = await Encryptor.encrypt2(budget, value.toString());
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/entries/${categoryId}`, {
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
  const result = await response.json();

  if (!response.ok) {
    throw new Error(Object.values(result).join('\n'));
  }

  return await true;
};

/**
 * @param budget string
 * @param year string
 * @param month string
 * @returns {Promise<[any]>}
 */
const fetchBudget = async (budget, year, month) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/entries/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};

const saveBudgetEpic = (action$, store) =>
  action$
    .ofType(Actions.SAVE_BUDGET)
    .concatMap(action => {
      const state = store.getState();
      const data = {
        ...action.payload,
        budget: budgetSelector(state),
        year: yearSelector(state),
        month: monthSelector(state),
      };
      const { budget, year, month, categoryId, valueType, value } = data;

      return Observable
        .from(saveValueAction(budget, year, month, categoryId, valueType, value))
        .map(() => ({
          type: Actions.SAVE_SUCCESS,
          payload: data
        }))
        .catch(error => Observable.of({
          type: Actions.SAVE_FAIL,
          payload: data,
          error: error.message,
        }))
        .startWith({
          type: Actions.SAVING_BUDGET,
          payload: data,
        });
    })
;

const loadBudgetEpic = (action$, store) =>
  action$
    .filter(action => [ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH].indexOf(action.type) !== -1)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = yearSelector(state);
      const currentMonth = monthSelector(state);
      const budget = budgetSelector(state);

      return Observable
        .from(fetchBudget(budget, currentYear, currentMonth))
        .map(entries => entries.map(entry => ({
          plan: { encrypted: entry.plan },
          real: { encrypted: entry.real },
          categoryId: entry.category.id,
          type: entry.category.type,
        })))
        .map(entries => loadBudget(currentYear, currentMonth, entries))
        .catch(error => Observable.of(addBudgetError(error.message)));
    })
;

const decodeBudgetEpic = action$ =>
  action$
    .ofType(LOAD_ENCRYPTED_BUDGET)
    .map(action => decryptBudget(action.payload.year, action.payload.month, action.payload.values))
;

const decryptBudgetEpic = (action$, store) =>
  action$
    .ofType(DECRYPT_BUDGET)
    .mergeMap(action => {
      const { year, month, entries } = action.payload;
      const state = store.getState();
      const budget = budgetSelector(state);
      const actions = entries.map(entry => decryptBudgetEntry(budget, year, month, entry));

      return Observable.of(actions).mergeAll();
    })
;

const decryptValue = async (budget, value) => (
  value.encrypted ? parseFloat(await Encryptor.decrypt2(budget, value.encrypted)) : (value.value || 0)
);
const decryptBudgetEntryEpic = action$ =>
  action$
    .ofType(DECRYPT_BUDGET_ENTRY)
    .mergeMap(action => {
      const { budget, year, month, entry } = action.payload;

      if (!Encryptor.hasEncryptionPassword2(budget)) {
        return Observable.of(requirePassword(action));
      }

      const promise = async () => updateBudgetEntry(year, month, entry.categoryId, {
        plan: {
          value: await decryptValue(budget, entry.plan),
          encrypted: false,
        },
        real: {
          value: await decryptValue(budget, entry.real),
          encrypted: false,
        },
      });

      return Observable
        .from(promise())
        .catch(handleEncryptionError2(budget, action))
      ;
    })
;

const clearBudgetsErrorsEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .map(() => clearBudgetErrors())
;

export const budgetEpic = combineEpics(
  saveBudgetEpic,
  loadBudgetEpic,
  decodeBudgetEpic,
  decryptBudgetEpic,
  decryptBudgetEntryEpic,
  clearBudgetsErrorsEpic,
);
