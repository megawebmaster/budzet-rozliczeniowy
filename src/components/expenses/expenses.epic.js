import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import * as Actions from './expenses.actions';
import { month, year } from '../location';
import { ROUTE_EXPENSES_MONTH } from '../../routes';
import { loadExpenses } from './expenses.actions';
import { Authenticator } from '../../App.auth';

const addValueAction = (year, month, value) => (
  fetch(`http://localhost:8080/budgets/${year}/expenses/${month}`, {
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
const saveValueAction = (year, month, value) => (
  fetch(`http://localhost:8080/budgets/${year}/expenses/${month}/${value.id}`, {
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
const deleteValueAction = (year, month, value) => (
  fetch(`http://localhost:8080/budgets/${year}/expenses/${month}/${value.id}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    method: 'DELETE',
  }).then(response => response.json())
);

const fetchExpenses = (year, month) => (
  fetch(`http://localhost:8080/budgets/${year}/expenses/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
  }).then(response => response.json())
);

const addItem = (data) => {
  // TODO: Add support for handling errors
  return Observable
    .from(addValueAction(data.year, data.month, data.row))
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
  // TODO: Add support for handling errors
  return Observable
    .from(saveValueAction(data.year, data.month, data.row))
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

const addItemEpic = (action$) =>
  action$
    .ofType(Actions.ADD_ITEM)
    .concatMap((action) => addItem(action.payload))
;
const saveItemEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_ITEM)
    .debounceTime(1000)
    .concatMap((action) => saveItem(action.payload))
;
const removeItemEpic = (action$, store) =>
  action$
    .ofType(Actions.REMOVE_ITEM)
    .do((action) => {
      const state = store.getState();
      deleteValueAction(year(state), month(state), action.payload.row);
    })
    .filter(() => false)
;
const loadExpensesEpic = (action$, store) =>
  action$
    .ofType(ROUTE_EXPENSES_MONTH)
    .mergeMap(() => {
      const state = store.getState();
      const currentYear = year(state);
      const currentMonth = month(state);

      return Observable
        .from(fetchExpenses(currentYear, currentMonth))
        .map(values => loadExpenses(currentYear, currentMonth, values));
    })
;

export const expensesEpic = combineEpics(
  addItemEpic,
  saveItemEpic,
  removeItemEpic,
  loadExpensesEpic
);
