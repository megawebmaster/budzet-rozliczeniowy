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

const saveCategoryAction = (type, name, parent = null) => (
  fetch('http://localhost:8080/categories', {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *omit
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ type, name, parent_id: parent }),
    method: 'POST',
    // mode: 'cors', // no-cors, *same-origin
  }).then(response => response.json())
);

const deleteCategoryAction = (type, id) => (
  fetch(`http://localhost:8080/categories/${id}`, {
    method: 'DELETE',
  })
);

const addCategoryEpic = (action$) =>
  action$
    .ofType(ADD_CATEGORY)
    .mergeMap((action) => (
      Observable.from(saveCategoryAction(action.payload.type, action.payload.name, action.payload.parentId))
        .map(category => updateCategory(action.payload.type, action.payload, category))
    ))
;

const removeCategoryEpic = (action$) =>
  action$
    .ofType(REMOVE_CATEGORY)
    .do((action) => deleteCategoryAction(action.payload.type, action.payload.id))
    .filter(() => false)
;

export const categoriesEpic = combineEpics(
  addCategoryEpic,
  removeCategoryEpic,
);
