import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as Actions from './budget.actions';

export class BudgetSaga {
  static* savePlannedIncome(action) {
    console.log('saving planned income', action.payload);
    yield put({
      type: Actions.UPDATE_INCOME_PLANNED,
      payload: action.payload,
    });
    yield call(delay, 1000); // TODO: To be removed - just a test

    // const response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
    const response = {
      status: 200,
    };
    yield BudgetSaga.handleSaveResponse(Actions.INCOME_PLANNED_SAVE_SUCCESS, Actions.INCOME_PLANNED_SAVE_FAIL, action, response);
    console.log('saved', action.payload);
  }

  static* saveRealIncome(action) {
    console.log('saving real income', action.payload);
    yield put({
      type: Actions.UPDATE_INCOME_REAL,
      payload: action.payload,
    });
    yield call(delay, 1000); // TODO: To be removed - just a test

    // const response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
    const response = {
      status: 200,
    };
    yield BudgetSaga.handleSaveResponse(Actions.INCOME_REAL_SAVE_SUCCESS, Actions.INCOME_REAL_SAVE_FAIL, action, response);
    console.log('saved', action.payload);
  }

  static* savePlannedExpense(action) {
    console.log('saving planned expense', action.payload);
    yield put({
      type: Actions.UPDATE_EXPENSE_PLANNED,
      payload: action.payload,
    });
    yield call(delay, 1000); // TODO: To be removed - just a test

    // const response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
    const response = {
      status: 200,
    };
    yield BudgetSaga.handleSaveResponse(Actions.EXPENSE_PLANNED_SAVE_SUCCESS, Actions.EXPENSE_PLANNED_SAVE_FAIL, action, response);
    console.log('saved', action.payload);
  }

  static* saveRealExpense(action) {
    console.log('saving real expense', action.payload);
    yield put({
      type: Actions.UPDATE_EXPENSE_REAL,
      payload: action.payload,
    });
    yield call(delay, 1000); // TODO: To be removed - just a test

    // const response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
    const response = {
      status: 200,
    };
    yield BudgetSaga.handleSaveResponse(Actions.EXPENSE_REAL_SAVE_SUCCESS, Actions.EXPENSE_REAL_SAVE_FAIL, action, response);
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
