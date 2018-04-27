import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { redirect } from 'redux-first-router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/throttleTime';
import { updateBudgets, updateYears } from '../components/configuration';
import { loadCategories } from '../components/categories';
import { ROUTE_BUDGET, ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from './routes.actions';
import { Authenticator } from '../App.auth';

const halfHour = 30*60*1000;

const fetchBudgets = () => (
  fetch('http://localhost:8080/budgets', {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'GET'
  }).then(response => response.json())
);

const fetchAvailableYears = (budgetSlug) => (
  fetch(`http://localhost:8080/budgets/${budgetSlug}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'GET'
  }).then(response => response.json())
);

const fetchCategories = (budgetSlug) => (
  fetch(`http://localhost:8080/budgets/${budgetSlug}/categories`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  }).then(response => response.json())
);

const fetchBudgetsEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .throttleTime(halfHour)
    .mergeMap(() => (
      Observable.from(fetchBudgets()).map(updateBudgets)
    ))
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

const fetchCategoriesEpic = (action$) =>
  action$
    .filter(action => [ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH].indexOf(action.type) !== -1)
    // .throttleTime(halfHour)
    .mergeMap(action => (
      Observable.from(fetchCategories(action.payload.budget)).map(loadCategories)
    ))
;

const redirectToMonthlyBudgetEpic = (action$) =>
  action$
    .ofType(ROUTE_BUDGET)
    .map((action) => {
      const month = action.payload.month || (new Date()).getMonth() + 1;
      const year = action.payload.year || (new Date()).getFullYear();
      const budget = action.payload.budget;

      return redirect({ type: ROUTE_BUDGET_MONTH, payload: { budget, year, month } });
    })
;

export const routesEpic = combineEpics(
  fetchBudgetsEpic,
  fetchYearsEpic,
  fetchCategoriesEpic,
  redirectToMonthlyBudgetEpic,
);
