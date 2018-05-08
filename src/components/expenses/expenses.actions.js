export const LOAD_EXPENSES = 'ExpensesAction.LOAD_EXPENSES';
export const ADD_EXPENSES_ERROR = 'ExpensesAction.ADD_ERROR';
export const CLEAR_EXPENSES_ERRORS = 'ExpensesAction.CLEAR_ERRORS';
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
export const savingItem = (year, month, row) => ({
  type: SAVING_ROW,
  payload: { year, month, row }
});
export const saveItemSuccess = (year, month, response) => ({
  type: SAVE_ITEM_SUCCESS,
  payload: {
    year,
    month,
    row: {
      id: response.id,
      category: response.category.id,
      price: response.value,
      day: response.day,
      description: response.description,
    },
  }
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
