import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/startWith';

import { Authenticator } from '../../App.auth';
import { budget as budgetSelector, month, year } from '../location';
import { ROUTE_EXPENSES_MONTH } from '../../routes';
import * as Actions from './expenses.actions';
import { loadExpenses } from './expenses.actions';
import { Encryptor } from '../../App.encryption';
import { saveItemSuccess } from './expenses.actions';
import { savingItem } from './expenses.actions';
import { monthExpenses } from './expenses.selectors';

/**
 * @param url string
 * @param type string
 * @param value object
 * @param budgetValue number
 * @returns {Promise<{value: *, description: *}>}
 */
async function submitValue(url, type, value, budgetValue) {
  const encryptedPrice = await Encryptor.encrypt(value.price.toString());
  const encryptedDescription = await Encryptor.encrypt(value.description);
  const encryptedBudgetValue = await Encryptor.encrypt(budgetValue.toString());
  // TODO: Add support for failures
  const response = await fetch(url, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      category_id: value.category,
      value: encryptedPrice,
      day: value.day,
      description: encryptedDescription,
      budget_value: encryptedBudgetValue,
    }),
    method: type,
  });
  const expense = await response.json();

  return {
    ...expense,
    value: value.price,
    description: value.description,
    errors: {},
  };
}

/**
 * @param budget string
 * @param year string
 * @param month string
 * @param value object
 * @param budgetValue number
 * @returns {Promise<{value: *, description: *}>}
 */
const addValueAction = async (budget, year, month, value, budgetValue) => (
  await submitValue(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}`, 'POST', value, budgetValue)
);

/**
 * @param budget string
 * @param year string
 * @param month string
 * @param value object
 * @param budgetValue number
 * @returns {Promise<{value: *, description: *}>}
 */
const saveValueAction = async (budget, year, month, value, budgetValue) => (
  await submitValue(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}/${value.id}`, 'PUT', value, budgetValue)
);

/**
 * @param budget string
 * @param year string
 * @param month string
 * @param row object
 * @param budgetValue number
 * @returns {Promise<any>}
 */
const deleteValueAction = async ({ budget, year, month, row, budgetValue }) => {
  const encryptedBudgetValue = await Encryptor.encrypt(budgetValue.toString());
  const response = await fetch(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}/${row.id}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      budget_value: encryptedBudgetValue,
    }),
    method: 'DELETE',
  });

  return await response.json();
};

/**
 * @param budget string
 * @param year string
 * @param month string
 * @returns {Promise<[any]>}
 */
const fetchExpenses = async (budget, year, month) => {
  const response = await fetch(`http://localhost:8080/budgets/${budget}/${year}/expenses/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
  });
  const expenses = await response.json();

  return Promise.all(expenses.map(async expense => ({
    ...expense,
    value: parseFloat(await Encryptor.decrypt(expense.value)),
    description: await Encryptor.decrypt(expense.description),
    errors: {},
  })));
};

const addItem = (data) => {
  const { budget, year, month, row, budgetValue } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(addValueAction(budget, year, month, row, budgetValue))
    .map(result => saveItemSuccess(year, month, result));
  // Actions.SAVE_ITEM_FAIL
};
const saveItem = (data) => {
  const { budget, year, month, row, budgetValue } = data;
  // TODO: Add support for handling errors
  return Observable
    .from(saveValueAction(budget, year, month, row, budgetValue))
    .map(result => saveItemSuccess(year, month, result))
    .startWith(savingItem(year, month, row));
  // Actions.ADD_ITEM_FAIL
};
const calculateBudgetValue = (state, { row }) => (
  monthExpenses(state)
    .filter(expense => expense.category === row.category && expense.id !== row.id)
    .reduce((result, expense) => result + expense.price, row.price)
);

const addItemEpic = (action$, store) =>
  action$
    .ofType(Actions.ADD_ITEM)
    .concatMap(action => {
      const state = store.getState();
      return addItem({
        ...action.payload,
        budget: budgetSelector(state),
        budgetValue: calculateBudgetValue(state, action.payload),
      });
    })
;
const saveItemEpic = (action$, store) =>
  action$
    .ofType(Actions.SAVE_ITEM)
    .concatMap(action => {
      const state = store.getState();
      return saveItem({
        ...action.payload,
        budget: budgetSelector(state),
        budgetValue: calculateBudgetValue(state, action.payload),
      });
    })
;
const removeItemEpic = (action$, store) =>
  action$
    .ofType(Actions.REMOVE_ITEM)
    .do(action => {
      const state = store.getState();
      // TODO: Add support for errors
      deleteValueAction({
        ...action.payload,
        budget: budgetSelector(state),
        budgetValue: calculateBudgetValue(state, action.payload),
      });
        // budgetSelector(state), action.payload.year, action.payload.month, action.payload.row);
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
