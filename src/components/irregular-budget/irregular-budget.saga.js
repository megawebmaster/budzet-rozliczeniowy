import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as Actions from './irregular-budget.actions';

export class IrregularBudgetSaga {
  static* savePlannedIrregular(action) {
    console.log('saving planned irregular', action.payload);
    yield put({
      type: Actions.UPDATE_IRREGULAR_PLANNED,
      payload: action.payload,
    });
    yield call(delay, 1000); // TODO: To be removed - just a test

    // const response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
    const response = {
      status: 200,
    };
    yield IrregularBudgetSaga.handleSaveResponse(Actions.IRREGULAR_PLANNED_SAVE_SUCCESS, Actions.IRREGULAR_PLANNED_SAVE_FAIL, action, response);
    console.log('saved', action.payload);
  }

  static* handleSaveResponse(successType, failureType, action, response) {
    if (response.status === 200) {
      yield put({
        type: successType,
        payload: action.payload,
      });
    } else {
      yield put({
        type: failureType,
        payload: action.payload,
        error: response.error,
      });
      // TODO: If possible (not a validation error) - try to save again
      // yield put(action);
    }
    // let data = null;
    //
    // if (response.status === 200) {
    //   const json = yield response.json();
    //
    //   data = json.results[0];
    // }
  }
}
