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
import { addExpensesError, clearExpensesErrors, loadExpenses, saveItemSuccess, savingItem } from './expenses.actions';
import { Encryptor } from '../../App.encryption';
import { monthExpenses } from './expenses.selectors';
import { saveItemFailed } from './expenses.actions';
import { removeItemFailed } from './expenses.actions';

class SubmitExpenseError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}

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
  const result = await response.json();

  if(!response.ok) {
    const baseKeys = Object.keys(result).filter(key => key.indexOf('budget_') === 0);
    const base = baseKeys.map(key => result[key]).join(', ');
    throw new SubmitExpenseError({ ...result, base });
  }

  return {
    ...result,
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
  await submitValue(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/expenses/${month}`, 'POST', value, budgetValue)
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
  await submitValue(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/expenses/${month}/${value.id}`, 'PUT', value, budgetValue)
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
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/expenses/${month}/${row.id}`, {
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
  const result = await response.json();

  if (!response.ok) {
    throw new Error(Object.values(result).join(', '));
  }

  return result;
};

/**
 * @param budget string
 * @param year string
 * @param month string
 * @returns {Promise<[any]>}
 */
const fetchExpenses = async (budget, year, month) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/${year}/expenses/${month}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return Promise.all(result.map(async expense => ({
    ...expense,
    value: parseFloat(await Encryptor.decrypt(expense.value)),
    description: await Encryptor.decrypt(expense.description),
    errors: {},
    saved: true,
  })));
};

const addItem = (data) => {
  const { budget, year, month, row, budgetValue } = data;

  return Observable
    .from(addValueAction(budget, year, month, row, budgetValue))
    .map(result => saveItemSuccess(year, month, row, result))
    .catch(error => Observable.of(saveItemFailed(year, month, row, error.errors)));
};
const saveItem = (data) => {
  const { budget, year, month, row, budgetValue } = data;

  return Observable
    .from(saveValueAction(budget, year, month, row, budgetValue))
    .map(result => saveItemSuccess(year, month, row, result))
    .catch(error => Observable.of(saveItemFailed(year, month, row, error.errors)))
    .startWith(savingItem(year, month, row));
};
const calculateBudgetValue = (state, { row }, baseValue) => (
  monthExpenses(state)
    .filter(expense => expense.category === row.category && expense.id !== row.id)
    .reduce((result, expense) => result + expense.price, baseValue)
);

const addItemEpic = (action$, store) =>
  action$
    .ofType(Actions.ADD_ITEM)
    .concatMap(action => {
      const state = store.getState();
      return addItem({
        ...action.payload,
        budget: budgetSelector(state),
        budgetValue: calculateBudgetValue(state, action.payload, action.payload.row.price),
      });
    })
;

const saveItemEpic = (action$, store) =>
  action$
    .ofType(Actions.SAVE_ITEM)
    .concatMap(action => {
      const state = store.getState();

      if (action.payload.row.saved) {
        return saveItem({
          ...action.payload,
          budget: budgetSelector(state),
          budgetValue: calculateBudgetValue(state, action.payload, action.payload.row.price),
        });
      } else {
        return addItem({
          ...action.payload,
          budget: budgetSelector(state),
          budgetValue: calculateBudgetValue(state, action.payload, action.payload.row.price),
        });
      }
    })
;

const removeItemEpic = (action$, store) =>
  action$
    .ofType(Actions.REMOVE_ITEM)
    .concatMap(action => {
      const state = store.getState();

      return Observable
        .from(deleteValueAction({
          ...action.payload,
          budget: budgetSelector(state),
          budgetValue: calculateBudgetValue(state, action.payload, 0.0),
        }))
        .catch(error => Observable.of(removeItemFailed(year(state), month(state), action.payload.row, error.message)))
        .ignoreElements()
      ;
    })
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
        .map(values => loadExpenses(currentYear, currentMonth, values))
        .catch(error => Observable.of(addExpensesError(error.message)));
    })
;

const clearExpensesErrorsEpic = (action$) =>
  action$
    .filter(action => action.type.indexOf('Route/') === 0)
    .map(() => clearExpensesErrors())
;

export const expensesEpic = combineEpics(
  addItemEpic,
  saveItemEpic,
  removeItemEpic,
  loadExpensesEpic,
  clearExpensesErrorsEpic,
);
