export const LOAD_ENCRYPTED_EXPENSES = 'ExpensesAction.LOAD_ENCRYPTED_EXPENSES';
export const DECRYPT_EXPENSES = 'ExpensesAction.DECRYPT_EXPENSES';
export const DECRYPT_EXPENSE = 'ExpensesAction.DECRYPT_EXPENSE';

export const ADD_EXPENSES_ERROR = 'ExpensesAction.ADD_ERROR';
export const CLEAR_EXPENSES_ERRORS = 'ExpensesAction.CLEAR_ERRORS';
export const SORT_EXPENSES = 'ExpensesAction.SORT_EXPENSES';
export const ADD_ITEM = 'ExpensesAction.ADD_ITEM';
export const SAVE_ITEM = 'ExpensesAction.SAVE_ITEM';
export const REMOVE_ITEM = 'ExpensesAction.REMOVE_ITEM';
export const REMOVE_ITEM_FAIL = 'ExpensesAction.REMOVE_ITEM_FAIL';
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
  type: LOAD_ENCRYPTED_EXPENSES,
  payload: { year, month, values }
});
export const decryptExpenses = (year, month, expenses) => ({
  type: DECRYPT_EXPENSES,
  payload: { year, month, expenses }
});
export const decryptExpense = (budget, year, month, expense) => ({
  type: DECRYPT_EXPENSE,
  payload: { budget, year, month, expense }
});
export const sortExpenses = (year, month, field) => ({
  type: SORT_EXPENSES,
  payload: { year, month, field }
});
export const savingItem = (year, month, row) => ({
  type: SAVING_ROW,
  payload: { year, month, row }
});
export const saveItemSuccess = (year, month, current, result) => ({
  type: SAVE_ITEM_SUCCESS,
  payload: {
    year,
    month,
    current,
    saved: result,
  }
});
export const saveItemFailed = (year, month, row, error) => ({
  type: SAVE_ITEM_FAIL,
  payload: {
    year,
    month,
    row,
  },
  error
});
export const removeItemFailed = (year, month, row, error) => ({
  type: REMOVE_ITEM_FAIL,
  payload: {
    year,
    month,
    row,
  },
  error
});

export const addExpensesError = (error) => ({
  type: ADD_EXPENSES_ERROR,
  payload: {},
  error
});

export const clearExpensesErrors = () => ({
  type: CLEAR_EXPENSES_ERRORS,
  payload: {},
});
