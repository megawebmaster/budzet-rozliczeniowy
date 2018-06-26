import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import { budget as budgetSelector, month as monthSelector, year as yearSelector } from '../location';
import * as Actions from './irregular-budget.actions';
import {
  addIrregularBudgetError,
  clearIrregularBudgetErrors,
  DECRYPT_IRREGULAR_BUDGET,
  DECRYPT_IRREGULAR_BUDGET_ENTRY,
  decryptIrregularBudget,
  decryptIrregularBudgetEntry,
  LOAD_ENCRYPTED_IRREGULAR_BUDGET,
  loadIrregularBudget,
  updateIrregularBudgetEntry
} from './irregular-budget.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';
import { Authenticator } from '../../App.auth';
import { Encryptor, handleEncryptionError2 } from '../../App.encryption';
import { requirePassword } from '../password-requirement';

/**
 * @param budget string
 * @param year string
 * @param categoryId number
 * @param value number
 * @returns {Promise<boolean>}
 */
const saveIrregularValueAction = async (budget, year, categoryId, value) => {
  const encryptedValue = await Encryptor.encrypt2(budget, value.toString());
  const encryptedMonthlyValue = await Encryptor.encrypt2(budget, (value / 10.0).toString());
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/irregular/${categoryId}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      plan: encryptedValue,
      plan_monthly: encryptedMonthlyValue,
    }),
    method: 'PUT',
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(Object.values(result).join('\n'));
  }

  return true;
};

/**
 * @param budget string
 * @param year string
 * @returns {Promise}
 */
const fetchIrregularBudget = async (budget, year) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/irregular`, {
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

  return result;
};

const saveIrregularBudgetEpic = (action$, store) =>
  action$
    .ofType(Actions.SAVE_IRREGULAR_BUDGET)
    .concatMap(action => {
      const state = store.getState();
      const data = {
        ...action.payload,
        budget: budgetSelector(state),
        year: yearSelector(state),
        month: monthSelector(state),
      };
      const { budget, year, categoryId, value } = data;

      return Observable
        .from(saveIrregularValueAction(budget, year, categoryId, value))
        .map(() => ({
          type: Actions.SAVE_IRREGULAR_SUCCESS,
          payload: data
        }))
        .catch(error => Observable.of({
          type: Actions.SAVE_IRREGULAR_FAIL,
          payload: data,
          error: error.message,
        }))
        .startWith({
          type: Actions.SAVING_IRREGULAR_BUDGET,
          payload: data,
        });
    })
;

const loadIrregularBudgetEpic = (action$, store) =>
  action$
    .ofType(ROUTE_BUDGET_IRREGULAR)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = yearSelector(state);
      const budget = budgetSelector(state);

      return Observable
        .from(fetchIrregularBudget(budget, currentYear))
        .map(entries => entries.map(entry => ({
          plan: { encrypted: entry.plan },
          real: { encrypted: entry.monthlyRealValues },
          categoryId: entry.category.id,
          type: entry.category.type,
        })))
        .map(entries => loadIrregularBudget(currentYear, entries))
        .catch(error => Observable.of(addIrregularBudgetError(error.message)));
    })
;

const decodeIrregularBudgetEpic = action$ =>
  action$
    .ofType(LOAD_ENCRYPTED_IRREGULAR_BUDGET)
    .map(action => decryptIrregularBudget(action.payload.year, action.payload.values))
;

const decryptIrregularBudgetEpic = (action$, store) =>
  action$
    .ofType(DECRYPT_IRREGULAR_BUDGET)
    .mergeMap(action => {
      const { year, entries } = action.payload;
      const state = store.getState();
      const budget = budgetSelector(state);
      const actions = entries.map(entry => decryptIrregularBudgetEntry(budget, year, entry));

      return Observable.of(actions).mergeAll();
    })
;

const decryptValue = async (budget, value) => (
  value.encrypted ? parseFloat(await Encryptor.decrypt2(budget, value.encrypted)) : (value.value || 0)
);
const getRealValue = async (budget, entry) => {
  /** @var string[] values */
  const values = await Promise.all(entry.real.encrypted.map(async value =>
    parseFloat(await Encryptor.decrypt2(budget, value))
  ));

  return values.reduce((result, value) => result + value, 0.0);
};
const decryptIrregularBudgetEntryEpic = action$ =>
  action$
    .ofType(DECRYPT_IRREGULAR_BUDGET_ENTRY)
    .mergeMap(action => {
      const { budget, year, entry } = action.payload;

      if (!Encryptor.hasEncryptionPassword2(budget)) {
        return Observable.of(requirePassword(action));
      }

      const promise = async () => updateIrregularBudgetEntry(year, entry.categoryId, {
        plan: {
          value: await decryptValue(budget, entry.plan),
          encrypted: false,
        },
        real: {
          value: await getRealValue(budget, entry),
          encrypted: false,
        },
      });

      return Observable
        .from(promise())
        .catch(handleEncryptionError2(budget, action))
        ;
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
  decodeIrregularBudgetEpic,
  decryptIrregularBudgetEpic,
  decryptIrregularBudgetEntryEpic,
  clearIrregularBudgetErrorsEpic,
);
