import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as Actions from './SpendingAction';

class SpendingSaga {
  static* saveItem(action) {
    yield call(delay, 1000);
    console.log('saving', action.payload.row);
    yield put({
      type: Actions.SAVING_ROW,
      payload: action.payload,
    });
    yield call(delay, 1000); // TODO: To be removed - just a test
    console.log('saved', action.payload.row);

    // const response = yield fetch('https://randomuser.me/api/?inc=picture,name,email,phone,id,dob');
    const response = {
      status: 200,
      data: action.payload.row,
    };
    yield SpendingSaga.handleSaveResponse(action, response);
  }

  static* addItem(action) {
    // const response = yield fetch();
    const response = {
      status: 200,
      data: action.payload.row,
    };
    yield SpendingSaga.handleSaveResponse(action, response);
  }

  static* handleSaveResponse(action, response) {
    if (response.status === 200) {
      yield put({
        type: Actions.ADD_ITEM_SUCCESS,
        payload: {
          month: action.payload.month,
          row: response.data,
        },
        meta: null,
        error: null,
      });
    } else {
      yield put({
        type: Actions.ADD_ITEM_FAIL,
        payload: {
          month: action.payload.month,
          row: action.payload.row,
        },
        meta: null,
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

export default SpendingSaga;
