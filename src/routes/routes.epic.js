import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { redirect } from 'redux-first-router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { updateYears } from '../components/configuration';
import { loadCategories } from '../components/categories';
import { ROUTE_BUDGET, ROUTE_BUDGET_MONTH } from './routes.actions';
import { Authenticator } from '../App.auth';

// TODO: It's not worth reloading on every location change
const fetchAvailableYears = () => (
  fetch('http://localhost:8080/budgets', {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'GET'
  }).then(response => response.json())
);
const fetchCategories = () => (
  fetch('http://localhost:8080/categories', {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  }).then(response => response.json())
);

const fetchYearsEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .mergeMap(() => (
      Observable.from(fetchAvailableYears()).map(years => updateYears(years))
    ))
;

const fetchCategoriesEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .mergeMap(() => (
      Observable.from(fetchCategories()).map(categories => loadCategories(categories))
    ))
;

const redirectToMonthlyBudgetEpic = (action$) =>
  action$
    .ofType(ROUTE_BUDGET)
    .map((action) => {
      const month = action.payload.month || (new Date()).getMonth() + 1;
      const year = action.payload.year || (new Date()).getFullYear();

      return redirect({ type: ROUTE_BUDGET_MONTH, payload: { year, month } });
    })
;

export const routesEpic = combineEpics(
  fetchYearsEpic,
  fetchCategoriesEpic,
  redirectToMonthlyBudgetEpic,
);
