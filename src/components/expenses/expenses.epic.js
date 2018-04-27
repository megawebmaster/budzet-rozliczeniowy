import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/startWith';

import { Authenticator } from '../../App.auth';
import { budget as budgetSelector, month, year } from '../location';
import { ROUTE_EXPENSES_MONTH } from '../../routes';
import * as Actions from './expenses.actions';
import { loadExpenses } from './expenses.actions';

const addValueAction = (budget, year, month, value) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      category_id: value.category,
      value: value.price,
      day: value.day,
      description: value.description
    }),
    method: 'POST',
  }).then(response => response.json())
);
const saveValueAction = (budget, year, month, value) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}/${value.id}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      category_id: value.category,
      value: value.price,
      day: value.day,
      description: value.description
    }),
    method: 'PUT',
  }).then(response => response.json())
);
const deleteValueAction = (budget, year, month, value) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}/${value.id}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'DELETE',
  }).then(response => response.json())
);

const fetchExpenses = (budget, year, month) => (
  fetch(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
  }).then(response => response.json())
);

const addItem = (data) => {
  const { budget, year, month, row } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(addValueAction(budget, year, month, row))
    // TODO: Add action creator for SAVE_ITEM_SUCCESS?!?!
    .map(result => ({
      type: Actions.SAVE_ITEM_SUCCESS,
      payload: {
        year: data.year,
        month: data.month,
        row: {
          id: result.id,
          category: result.category.id,
          price: result.value,
          day: result.day,
          description: result.description,
        },
      }
    }));
  // Actions.SAVE_ITEM_FAIL
};
const saveItem = (data) => {
  const { budget, year, month, row } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(saveValueAction(budget, year, month, row))
    // TODO: Add action creator for SAVE_ITEM_SUCCESS?!?!
    .map(result => ({
      type: Actions.SAVE_ITEM_SUCCESS,
      payload: {
        year: data.year,
        month: data.month,
        row: {
          id: result.id,
          category: result.category.id,
          price: result.value,
          day: result.day,
          description: result.description,
        },
      }
    }))
    .startWith({
      type: Actions.SAVING_ROW,
      payload: data,
    });
  // Actions.ADD_ITEM_FAIL
};

const addItemEpic = (action$, store) =>
  action$
    .ofType(Actions.ADD_ITEM)
    .concatMap((action) => {
      const state = store.getState();
      return addItem({
        ...action.payload,
        budget: budgetSelector(state),
      });
    })
;
const saveItemEpic = (action$, store) =>
  action$
    .ofType(Actions.SAVE_ITEM)
    .debounceTime(1000)
    .concatMap((action) => {
      const state = store.getState();
      return saveItem({
        ...action.payload,
        budget: budgetSelector(state),
      });
    })
;
const removeItemEpic = (action$, store) =>
  action$
    .ofType(Actions.REMOVE_ITEM)
    .do((action) => {
      const state = store.getState();
      deleteValueAction(budgetSelector(state), action.payload.year, action.payload.month, action.payload.row);
    })
    .ignoreElements()
;
const loadExpensesEpic = (action$, store) =>
  action$
    .ofType(ROUTE_EXPENSES_MONTH)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = year(state);
      const currentMonth = month(state);
      const currentBudget = budgetSelector(state);

      return Observable
        .from(fetchExpenses(currentBudget, currentYear, currentMonth))
        .map(values => loadExpenses(currentYear, currentMonth, values));
    })
;

export const expensesEpic = combineEpics(
  addItemEpic,
  saveItemEpic,
  removeItemEpic,
  loadExpensesEpic
);
