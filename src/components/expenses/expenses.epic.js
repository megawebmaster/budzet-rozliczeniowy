import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import * as Actions from './expenses.actions';

const addItem = (data) => {
  // TODO: Replace this with proper request handling
  return Observable
    .of({
      type: Actions.ADD_ITEM_SUCCESS,
      payload: {
        year: data.year,
        month: data.month,
        row: data.row,
      }
    });
  // Actions.ADD_ITEM_FAIL
};
const saveItem = (data) => {
  // TODO: Replace this with proper request handling
  return Observable
    .of({
      type: Actions.ADD_ITEM_SUCCESS,
      payload: {
        year: data.year,
        month: data.month,
        row: data.row,
      }
    })
    .delay(1000)
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
    .throttleTime(2000)
    .concatMap((action) => saveItem(action.payload))
;
const removeItemEpic = (action$) =>
  action$
    .ofType(Actions.REMOVE_ITEM)
    .filter(() => false)
;

export const expensesEpic = combineEpics(
  addItemEpic,
  saveItemEpic,
  removeItemEpic
);
