import { combineEpics } from 'redux-observable';
import { redirect } from 'redux-first-router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeAll';

import { Authenticator } from '../../App.auth';
import * as Actions from './configuration.actions';
import { ROUTE_BUDGET_MONTH } from '../../routes/routes.actions';
import { month as monthSelector, year as yearSelector } from '../location';
import { Encryptor } from '../../App.encryption';

/**
 * @param budget string
 * @param values object
 * @returns {Promise<boolean>}
 */
const saveValueAction = async (budget, values) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify(values),
    method: 'PATCH',
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(Object.values(result).join('\n'));
  }

  return result;
};

const renameBudgetEpic = (action$, store) =>
  action$
    .ofType(Actions.RENAME_BUDGET)
    .concatMap(action => Observable
      .from(saveValueAction(action.payload.budget.slug, { name: action.payload.name }))
      .map((result) => {
        const state = store.getState();
        const year = yearSelector(state);
        const month = monthSelector(state);
        Encryptor.movePassword(action.payload.budget.slug, result.slug);

        return [
          {
            type: Actions.RENAME_BUDGET_SUCCESS,
            payload: { budget: result },
          },
          redirect({ type: ROUTE_BUDGET_MONTH, payload: { budget: result.slug, year, month } }),
        ];
      })
      .mergeAll()
      .catch(error => Observable.of({
        type: Actions.RENAME_BUDGET_FAIL,
        payload: { budget: action.payload.budget },
        error: error.message,
      }))
    )
;

export const configurationEpic = combineEpics(
  renameBudgetEpic,
);
