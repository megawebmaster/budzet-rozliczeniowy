import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
  replaceCategory,
} from './categories.actions';
import { budget, month, year } from '../location';
import { Authenticator } from '../../App.auth';
import { Encryptor } from '../../App.encryption';
import { ROUTE_BUDGET_MONTH, ROUTE_EXPENSES_MONTH } from '../../routes/routes.actions';
import { loadCategories } from './index';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';

// const halfHour = 30*60*1000;

const fetchCategories = async (budgetSlug) => {
  const response = await fetch(`http://localhost:8080/budgets/${budgetSlug}/categories`, {
    headers: new Headers({
      'Accept': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    })
  });
  const categories = await response.json();

  return await Promise.all(categories.map(async category => ({
    ...category,
    name: await Encryptor.decrypt(category.name)
  })));
};

const saveCategoryAction = async (type, name, budget, year, month, parent = null) => {
  const encryptedName = await Encryptor.encrypt(name);
  const response = await fetch(`http://localhost:8080/budgets/${budget}/categories`, {
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
  const category = await response.json();

  return { ...category, name };
};

const updateCategoryAction = async (type, budget, id, values) => {
  const encryptedName = await Encryptor.encrypt(values.name);
  const response = await fetch(`http://localhost:8080/budgets/${budget}/categories/${id}`, {
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
  const category = await response.json();

  return { ...category, name: values.name };
};

const deleteCategoryAction = (type, budget, id, year, month) => (
  fetch(`http://localhost:8080/budgets/${budget}/categories/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authenticator.getToken()}`,
    }),
    body: JSON.stringify({
      type, year, month
    }),
  })
);

// TODO: Figure out how to throttle requests until budget changes
const fetchCategoriesEpic = (action$) =>
  action$
    .filter(action => [ROUTE_BUDGET_MONTH, ROUTE_BUDGET_IRREGULAR, ROUTE_EXPENSES_MONTH].indexOf(action.type) !== -1)
    // .throttleTime(halfHour)
    .mergeMap(action => (
      Observable.from(fetchCategories(action.payload.budget)).map(loadCategories)
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
      return Observable.from(promise).map(category => replaceCategory(action.payload.type, action.payload, category));
    })
;

const updateCategoryEpic = (action$, store) =>
  action$
    .ofType(UPDATE_CATEGORY)
    .mergeMap(action => {
      const state = store.getState();
      const promise = updateCategoryAction(
        action.payload.type,
        budget(state),
        action.payload.category.id,
        action.payload.values
      );
      return Observable.from(promise);
    })
    .ignoreElements()
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
