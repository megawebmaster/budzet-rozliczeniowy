import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatMap';
import * as Actions from './irregular-budget.actions';

const updatePlannedValue = (data) => {
  // TODO: Replace this with proper request handling
  return Observable
    .of({
      type: Actions.IRREGULAR_PLANNED_SAVE_SUCCESS,
      payload: data
    })
    .delay(1000)
    .startWith({
      type: Actions.UPDATE_IRREGULAR_PLANNED,
      payload: data,
    });
  // Actions.IRREGULAR_PLANNED_SAVE_FAIL
};

const plannedEpic = (action$) =>
  action$
    .ofType(Actions.SAVE_IRREGULAR_PLANNED)
    .concatMap(action => updatePlannedValue(action.payload))
;

export const irregularBudgetEpic = combineEpics(
  plannedEpic
);
