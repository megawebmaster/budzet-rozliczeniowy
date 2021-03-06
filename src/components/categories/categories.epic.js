import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';
import {
  ADD_CATEGORY,
  DECRYPT_CATEGORIES,
  decryptCategories,
  LOAD_ENCRYPTED_CATEGORIES,
  loadCategories,
  REMOVE_CATEGORY,
  removeCategoryError,
  replaceCategory,
  setCategoryError,
  UPDATE_CATEGORY,
} from './categories.actions';
import { budget as budgetSelector, budget, month, year as yearSelector } from '../location';
import { Authenticator } from '../../App.auth';
import { Encryptor, handleEncryptionError } from '../../App.encryption';
import { ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from '../../routes/routes.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';
import { addBudgetError } from '../budget/budget.actions';
import { addExpensesError } from '../expenses/expenses.actions';
import { addIrregularBudgetError } from '../irregular-budget/irregular-budget.actions';
import { findCategory } from './categories.selectors';
import { requirePassword } from '../password-requirement';

const halfHour = 30 * 60 * 1000;

const calculateAverageValue = async (budget, averageValues) => {
  if (averageValues.length === 0) {
    return 0.0;
  }

  /** @var array */
  const decryptedValues = await Promise.all(averageValues.map(async value =>
    value ? await Encryptor.decrypt(budget, value) : 0
  ));

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

  return result;
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
  const encryptedName = await Encryptor.encrypt(budget, name);
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
  const encryptedName = await Encryptor.encrypt(budget, values.name);
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

  return { ...result, name: values.name, error: '', deleteError: '' };
};

/**
 * @param type string
 * @param budget string
 * @param id number
 * @param year string
 * @param month string
 * @returns {Promise<boolean>}
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

  return true;
};

// TODO: Figure out how to throttle requests until budget changes
const fetchCategoriesEpic = (action$) =>
  action$
    .filter(action => [ROUTE_BUDGET_MONTH, ROUTE_BUDGET_IRREGULAR, ROUTE_EXPENSES_MONTH].indexOf(action.type) !== -1)
    .throttleTime(halfHour)
    .mergeMap(action => (
      Observable
        .from(fetchCategories(action.payload.budget))
        .map(categories => categories.map(category => ({
          ...category,
          name: '',
          encrypted: category.name,
          averageValue: 0,
          deleteError: '',
          error: '',
          saving: false,
          saved: true,
        })))
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

const decodeCategoriesEpic = action$ =>
  action$
    .ofType(LOAD_ENCRYPTED_CATEGORIES)
    .map(action => decryptCategories(action.payload.categories))
;

const decryptCategoriesEpic = (action$, store) =>
  action$
    .ofType(DECRYPT_CATEGORIES)
    .mergeMap(action => {
      const { categories } = action.payload;
      const state = store.getState();
      const budget = budgetSelector(state);

      if (!Encryptor.hasEncryptionPassword(budget)) {
        return Observable.of(requirePassword(action));
      }

      const actions = categories.map(async category => replaceCategory(category.type, category, {
        ...category,
        name: await Encryptor.decrypt(budget, category.encrypted),
        averageValue: await calculateAverageValue(budget, category.averageValues),
        encrypted: false,
      }));

      return Observable
        .from(actions)
        .mergeAll()
        .catch(handleEncryptionError(budget, action))
      ;
    })
;

const addCategoryEpic = (action$, store) =>
  action$
    .ofType(ADD_CATEGORY)
    .mergeMap(action => {
      const state = store.getState();
      const { id, name, type, parentId } = action.payload;
      const year = yearSelector(state);
      const category = findCategory(state, id, name, type, parentId);
      let promise;
      if (category && (new Date(category.startedAt)).getFullYear() === year) {
        promise = updateCategoryAction(type, budget(state), category.id, {
          name,
          year,
          month: month(state),
        });
      } else {
        promise = saveCategoryAction(type, name, budget(state), year, month(state), parentId);
      }

      return Observable.from(promise)
        .map(savedCategory => replaceCategory(type, action.payload, savedCategory))
        .catch(error => Observable.of(setCategoryError(action.payload, error.message)));
    })
;

const updateCategoryEpic = (action$, store) =>
  action$
    .ofType(UPDATE_CATEGORY)
    .mergeMap(action => {
      const state = store.getState();
      const { id, name, type, parentId, category, values } = action.payload;
      const existingCategory = findCategory(state, id, name, type, parentId);

      let promise;
      if (existingCategory || category.saved) {
        promise = updateCategoryAction(type, budget(state), category.id, {
          ...values,
          year: yearSelector(state),
          month: month(state)
        });
      } else {
        const parent = (category.parent || { id: null }).id;
        promise = saveCategoryAction(type, values.name, budget(state), yearSelector(state), month(state), parent);
      }

      return Observable.from(promise)
        .map(savedCategory => replaceCategory(type, category, savedCategory))
        .catch(error => Observable.of(setCategoryError(category, error.message)));
    })
;

const removeCategoryEpic = (action$, store) =>
  action$
    .ofType(REMOVE_CATEGORY)
    .mergeMap(action => {
      const state = store.getState();
      const { type, category } = action.payload;

      return Observable
        .from(deleteCategoryAction(type, budget(state), category.id, yearSelector(state), month(state)))
        .catch(error => Observable.of(removeCategoryError(category, error.message)));
    })
;

export const categoriesEpic = combineEpics(
  fetchCategoriesEpic,
  decodeCategoriesEpic,
  decryptCategoriesEpic,
  addCategoryEpic,
  updateCategoryEpic,
  removeCategoryEpic,
);
