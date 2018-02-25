import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import * as Actions from './budget.actions';

const saveChanges = (data, loaderType, successType, errorType) => {
  // TODO: Replace this with proper request handling
  return Observable
    .of({
      type: successType,
      payload: data
    })
    .delay(1000)
    .startWith({
      type: loaderType,
      payload: data,
    });
  // errorType
};

const saveBudgetEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_BUDGET)
    .concatMap((action) => saveChanges(
      action.payload,
      Actions.SAVING_BUDGET,
      Actions.SAVE_SUCCESS,
      Actions.SAVE_FAIL,
    ))
;

export const budgetEpic = combineEpics(
  saveBudgetEpic
);
