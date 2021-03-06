import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { redirect } from 'redux-first-router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/throttleTime';
import { updateBudgets, updateYears } from '../components/configuration';
import { ROUTE_BUDGET, ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from './routes.actions';
import { Authenticator } from '../App.auth';
import { Encryptor } from '../App.encryption';

const halfHour = 30*60*1000;

/**
 * @returns {Promise<Response>}
 */
export const fetchBudgets = () => (
  fetch(`${process.env.REACT_APP_API_URL}/budgets`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'GET'
  }).then(response => response.json())
);

const fetchAvailableYears = (budgetSlug) => (
  fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetSlug}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'GET'
  }).then(response => response.json())
);
const updateBudgetRecipientAction = async (budget, accessId, email) => {
  const recipient = await Encryptor.encrypt(budget, email);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}`, {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({ recipient }),
    method: 'PATCH',
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};

const fetchBudgetsEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0 && Authenticator.isLoggedIn())
    .throttleTime(halfHour)
    .mergeMap(() => (
      Observable.from(fetchBudgets()).map(updateBudgets)
    ))
    .do((action) => {
      action.payload.budgets.forEach(async (budget) => {
        if ((budget.recipient === null || budget.recipient.length === 0) && Encryptor.hasEncryptionPassword(budget.slug)) {
          await updateBudgetRecipientAction(budget.slug, budget.id, Authenticator.getUsername());
        }
      });
    })
;

// TODO: Figure out how to throttle requests until budget changes
const fetchYearsEpic = (action$) =>
  action$
    .filter(action => [ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH].indexOf(action.type) !== -1)
    // .throttleTime(halfHour)
    .mergeMap(action => (
      Observable.from(fetchAvailableYears(action.payload.budget)).map(updateYears)
    ))
;

const redirectToMonthlyBudgetEpic = (action$) =>
  action$
    .ofType(ROUTE_BUDGET)
    .map(action => {
      const month = action.payload.month || (new Date()).getMonth() + 1;
      const year = action.payload.year || (new Date()).getFullYear();
      const budget = action.payload.budget;

      return redirect({ type: ROUTE_BUDGET_MONTH, payload: { budget, year, month } });
    })
;

export const routesEpic = combineEpics(
  fetchBudgetsEpic,
  fetchYearsEpic,
  redirectToMonthlyBudgetEpic,
);
