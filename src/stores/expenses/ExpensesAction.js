export const ADD_ITEM = 'ExpensesAction.ADD_ITEM';
export const SAVE_ITEM = 'ExpensesAction.SAVE_ITEM';
export const REMOVE_ITEM = 'ExpensesAction.REMOVE_ITEM';
export const SAVING_ROW = 'ExpensesAction.SAVING_ROW';
export const ADD_ITEM_SUCCESS = 'ExpensesAction.ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAIL = 'ExpensesAction.ADD_ITEM_FAIL';

export const addItem = (row, year, month) => ({
  type: ADD_ITEM,
  payload: { row, year, month }
});
export const saveItem = (row, year, month) => ({
  type: SAVE_ITEM,
  payload: { row, year, month }
});
export const removeItem = (row, year, month) => ({
  type: REMOVE_ITEM,
  payload: { row, year, month }
});
