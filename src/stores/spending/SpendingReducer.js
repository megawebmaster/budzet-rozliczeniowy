import * as Actions from './SpendingAction';

const initialState = {};

export default (state = initialState, action) => {
  let rows, idx;

  switch(action.type){
    case Actions.ADD_ITEM_SUCCESS:
    case Actions.ADD_ITEM_FAIL:
      // TODO: Error handling for failures?
      rows = ((state[action.payload.year] || [])[action.payload.month] || []).slice();
      idx = rows.findIndex(item => item.id === action.payload.row.id);
      if (idx < 0) {
        rows.push({ ...action.payload.row, saving: false });
      } else {
        rows.splice(idx, 1, { ...rows[idx], saving: false });
      }
      return { ...state, rows: { ...state.rows, [action.payload.month]: rows }};
    case Actions.REMOVE_ITEM:
      rows = ((state[action.payload.year] || [])[action.payload.month] || []).slice();
      idx = rows.findIndex(item => item.id === action.payload.row.id);
      rows.splice(idx, 1);
      return { ...state, rows: { ...state.rows, [action.payload.month]: rows }};
    case Actions.SAVING_ROW:
      rows = ((state[action.payload.year] || [])[action.payload.month] || []).slice();
      idx = rows.findIndex(item => item.id === action.payload.row.id);
      rows.splice(idx, 1, { ...rows[idx], saving: true });
      return { ...state, rows: { ...state.rows, [action.payload.month]: rows }};
    default:
      return state;
  }
};
