export const ADD_ITEM = 'SpendingAction.ADD_ITEM';
export const SAVE_ITEM = 'SpendingAction.SAVE_ITEM';
export const SAVING_ROW = 'SpendingAction.SAVING_ROW';
export const ADD_ITEM_SUCCESS = 'SpendingAction.ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAIL = 'SpendingAction.ADD_ITEM_FAIL';

export const addItem = (row, month) => ({
  type: ADD_ITEM,
  payload: { row, month }
});
export const saveItem = (row, month) => ({
  type: SAVE_ITEM,
  payload: { row, month }
});
