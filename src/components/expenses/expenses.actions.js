export const LOAD_EXPENSES = 'ExpensesAction.LOAD_EXPENSES';
export const SORT_EXPENSES = 'ExpensesAction.SORT_EXPENSES';
export const ADD_ITEM = 'ExpensesAction.ADD_ITEM';
export const SAVE_ITEM = 'ExpensesAction.SAVE_ITEM';
export const REMOVE_ITEM = 'ExpensesAction.REMOVE_ITEM';
export const SAVING_ROW = 'ExpensesAction.SAVING_ROW';
export const SAVE_ITEM_SUCCESS = 'ExpensesAction.SAVE_ITEM_SUCCESS';
export const SAVE_ITEM_FAIL = 'ExpensesAction.SAVE_ITEM_FAIL';

export const addItem = (row, year, month) => ({
  type: ADD_ITEM,
  payload: { row: { ...row, id: Date.now() }, year, month }
});
export const saveItem = (row, year, month) => ({
  type: SAVE_ITEM,
  payload: { row, year, month }
});
export const removeItem = (row, year, month) => ({
  type: REMOVE_ITEM,
  payload: { row, year, month }
});
export const loadExpenses = (year, month, values) => ({
  type: LOAD_EXPENSES,
  payload: { year, month, values }
});
export const sortExpenses = (year, month, field) => ({
  type: SORT_EXPENSES,
  payload: { year, month, field }
});
