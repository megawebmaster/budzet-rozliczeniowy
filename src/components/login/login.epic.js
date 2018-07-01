import { combineEpics } from 'redux-observable';
import { redirect } from 'redux-first-router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeAll';

import { updateBudgets } from '../../components/configuration';
import { fetchBudgets, ROUTE_BUDGET_MONTH } from '../../routes';
import { USER_LOGGED_IN } from './login.actions';
import { Authenticator } from '../../App.auth';

const redirectToDefaultBudgetEpic = (action$) =>
  action$
    .ofType(USER_LOGGED_IN)
    .concatMap(() => Observable.from(fetchBudgets()).map(updateBudgets))
    .concatMap(action => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const budget = action.payload.budgets.find(b => b.isDefault);

      if (Authenticator.restorePath()) {
        return Observable.of();
      }

      return Observable.of([
        action,
        redirect({ type: ROUTE_BUDGET_MONTH, payload: { budget: budget.slug, year, month } })
      ]).mergeAll();
    })
;

export const loginEpic = combineEpics(
  redirectToDefaultBudgetEpic
);
