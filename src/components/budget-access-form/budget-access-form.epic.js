import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';

import { Authenticator } from '../../App.auth';
import { fetchBudgets, ROUTE_ACCESS_BUDGET, ROUTE_BUDGET_MONTH } from '../../routes';
import { budgetAccessId as budgetSelector } from '../location';
import { addError, addFormError, SAVE_ACCESS, setBudgetAccess } from './budget-access-form.actions';
import { addBudget, updateBudgets } from '../configuration';
import { Encryptor } from '../../App.encryption';
import { redirect } from 'redux-first-router';

/**
 * @returns {Promise<boolean>}
 * @param budgetAccessId
 * @param name
 */
const saveBudgetAccess = async (budgetAccessId, name) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budget-accesses/${budgetAccessId}`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({ name }),
    method: 'POST',
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};

/**
 * @returns {Promise<[any]>}
 * @param budgetAccessId
 */
const fetchBudgetAccess = async (budgetAccessId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budget-accesses/${budgetAccessId}`, {
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

const loadBudgetEpic = (action$, store) =>
  action$
    .ofType(ROUTE_ACCESS_BUDGET)
    .concatMap(() => {
        const state = store.getState();
        const budgetAccessId = budgetSelector(state);

        return Observable
          .from(fetchBudgetAccess(budgetAccessId))
          .map(setBudgetAccess)
          .catch(error => Observable.of(addError(error.message)))
      }
    )
;

const loadBudgetsDataEpic = (action$) =>
  action$
    .ofType(ROUTE_ACCESS_BUDGET)
    .concatMap(() => Observable.from(fetchBudgets()).map(updateBudgets))
;

const saveBudgetAccessEpic = (action$) =>
  action$
    .ofType(SAVE_ACCESS)
    .concatMap((action) => {
      const { recipient, budgetAccess, name, password } = action.payload;
      if (Authenticator.getUsername() !== recipient) {
        return Observable.of(addError('errors.budget-access.invalid-recipient'));
      }

      return Observable
        .from(saveBudgetAccess(budgetAccess.id, name))
        .do((budget) => Encryptor.setPassword(budget.slug, password))
        .concatMap(budget => Observable.of([
          addBudget(budget),
          redirect({
            type: ROUTE_BUDGET_MONTH,
            payload: { budget: budget.slug, year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 },
          })
        ]).mergeAll())
        .catch(error => Observable.of(addFormError(error.message)))
      }
    )
;

export const budgetAccessEpic = combineEpics(
  loadBudgetEpic,
  loadBudgetsDataEpic,
  saveBudgetAccessEpic,
);
