import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  updateCategory,
} from './categories.actions';
import { month, year } from '../location';

const saveCategoryAction = (type, name, year, month, parent = null) => (
  fetch('http://localhost:8080/categories', {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *omit
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      type, name, year, month, parent_id: parent
    }),
    method: 'POST',
    // mode: 'cors', // no-cors, *same-origin
  }).then(response => response.json())
);

const deleteCategoryAction = (type, id, year, month) => (
  fetch(`http://localhost:8080/categories/${id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      type, year, month
    }),
  })
);

const addCategoryEpic = (action$, store) =>
  action$
    .ofType(ADD_CATEGORY)
    .mergeMap((action) => {
      const state = store.getState();
      const promise = saveCategoryAction(
        action.payload.type,
        action.payload.name,
        year(state),
        month(state),
        action.payload.parentId
      );
      return Observable.from(promise).map(category => updateCategory(action.payload.type, action.payload, category));
    })
;

const removeCategoryEpic = (action$, store) =>
  action$
    .ofType(REMOVE_CATEGORY)
    .do((action) => {
      const state = store.getState();
      deleteCategoryAction(
        action.payload.type,
        action.payload.id,
        year(state),
        month(state)
      );
    })
    .filter(() => false)
;

export const categoriesEpic = combineEpics(
  addCategoryEpic,
  removeCategoryEpic,
);
