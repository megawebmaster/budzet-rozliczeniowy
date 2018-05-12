import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {
  ADD_CATEGORY,
  loadCategories,
  REMOVE_CATEGORY,
  replaceCategory,
  setCategoryError,
  UPDATE_CATEGORY,
} from './categories.actions';
import { budget, month, year } from '../location';
import { Authenticator } from '../../App.auth';
import { Encryptor } from '../../App.encryption';
import { ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from '../../routes/routes.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';
import { addBudgetError } from '../budget/budget.actions';
import { addExpensesError } from '../expenses/expenses.actions';
import { addIrregularBudgetError } from '../irregular-budget/irregular-budget.actions';

// const halfHour = 30*60*1000;

const calculateAverageValue = async (averageValues) => {
  if (averageValues.length === 0) {
    return 0.0;
  }

  /** @var array */
  const decryptedValues = await Promise.all(averageValues.map(async value => await Encryptor.decrypt(value)));

  return decryptedValues.reduce((result, value) => result + parseFloat(value), 0.0) / averageValues.length;
};

/**
 * @param budgetSlug string
 * @returns {Promise<[any]>}
 */
const fetchCategories = async (budgetSlug) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budgetSlug}/categories`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error);
  }

  return await Promise.all(result.map(async category => ({
    ...category,
    name: await Encryptor.decrypt(category.name),
    averageValue: await calculateAverageValue(category.averageValues),
    error: '',
    saving: false,
    saved: true,
  })));
};

/**
 * @param type string
 * @param name string
 * @param budget string
 * @param year string
 * @param month string
 * @param parent string|null
 * @returns {Promise<{name: *}>}
 */
const saveCategoryAction = async (type, name, budget, year, month, parent = null) => {
  const encryptedName = await Encryptor.encrypt(name);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/categories`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      type,
      year,
      month,
      name: encryptedName,
      parent_id: parent
    }),
    method: 'POST',
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(Object.values(result).join('\n'));
  }

  return { ...result, name, error: '' };
};

/**
 * @param type string
 * @param budget sting
 * @param id string
 * @param values object
 * @returns {Promise<{name: *}>}
 */
const updateCategoryAction = async (type, budget, id, values) => {
  const encryptedName = await Encryptor.encrypt(values.name);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/categories/${id}`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      ...values,
      name: encryptedName,
      parent_id: values.parent || null
    }),
    method: 'PATCH',
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(Object.values(result).join('\n'));
  }

  return { ...result, name: values.name, error: '' };
};

/**
 * @param type string
 * @param budget string
 * @param id number
 * @param year string
 * @param month string
 * @returns {Promise<Response>}
 */
const deleteCategoryAction = async (type, budget, id, year, month) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${budget}/categories/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      type, year, month
    }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error);
  }
};

// TODO: Figure out how to throttle requests until budget changes
const fetchCategoriesEpic = (action$) =>
  action$
    .filter(action => [ROUTE_BUDGET_MONTH, ROUTE_BUDGET_IRREGULAR, ROUTE_EXPENSES_MONTH].indexOf(action.type) !== -1)
    // .throttleTime(halfHour)
    .mergeMap(action => (
      Observable
        .from(fetchCategories(action.payload.budget))
        .map(loadCategories)
        .catch(error => {
          switch(action.type){
            case ROUTE_BUDGET_MONTH:
              return Observable.of(addBudgetError(error.message));
            case ROUTE_BUDGET_IRREGULAR:
              return Observable.of(addIrregularBudgetError(error.message));
            case ROUTE_EXPENSES_MONTH:
              return Observable.of(addExpensesError(error.message));
            default:
              return Observable.of();
          }
        })
    ))
;

const addCategoryEpic = (action$, store) =>
  action$
    .ofType(ADD_CATEGORY)
    .mergeMap(action => {
      const state = store.getState();
      const promise = saveCategoryAction(
        action.payload.type,
        action.payload.name,
        budget(state),
        year(state),
        month(state),
        action.payload.parentId
      );

      return Observable.from(promise)
        .map(category => replaceCategory(action.payload.type, action.payload, category))
        .catch(error => Observable.of(setCategoryError(action.payload, error.message)));
    })
;

const updateCategoryEpic = (action$, store) =>
  action$
    .ofType(UPDATE_CATEGORY)
    .mergeMap(action => {
      const state = store.getState();
      let promise;
      if (action.payload.category.saved) {
        promise = updateCategoryAction(
          action.payload.type,
          budget(state),
          action.payload.category.id,
          action.payload.values
        );
      } else {
        promise = saveCategoryAction(
          action.payload.type,
          action.payload.values.name,
          budget(state),
          year(state),
          month(state),
          action.payload.category.parent.id
        );
      }

      return Observable.from(promise)
        .map(category => replaceCategory(action.payload.type, action.payload.category, category))
        .catch(error => Observable.of(setCategoryError(action.payload.category, error.message)));
    })
;

const removeCategoryEpic = (action$, store) =>
  action$
    .ofType(REMOVE_CATEGORY)
    .do(action => {
      const state = store.getState();
      deleteCategoryAction(
        action.payload.type,
        budget(state),
        action.payload.id,
        year(state),
        month(state)
      );
    })
    .ignoreElements()
;

export const categoriesEpic = combineEpics(
  fetchCategoriesEpic,
  addCategoryEpic,
  updateCategoryEpic,
  removeCategoryEpic,
);
