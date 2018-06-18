export const LOAD_ENCRYPTED_BUDGET = 'BudgetAction.LOAD_ENCRYPTED_BUDGET';
export const DECRYPT_BUDGET = 'BudgetAction.DECRYPT_BUDGET';
export const DECRYPT_BUDGET_ENTRY = 'BudgetAction.DECRYPT_BUDGET_ENTRY';
export const UPDATE_BUDGET_ENTRY = 'BudgetAction.UPDATE_BUDGET_ENTRY';
export const ADD_BUDGET_ERROR = 'BudgetAction.ADD_ERROR';
export const CLEAR_BUDGET_ERRORS = 'BudgetAction.CLEAR_ERRORS';
export const SAVE_BUDGET = 'BudgetAction.SAVE_BUDGET';
export const SAVING_BUDGET = 'BudgetAction.UPDATE_BUDGET';
export const SAVE_SUCCESS = 'BudgetAction.SAVE_SUCCESS';
export const SAVE_FAIL = 'BudgetAction.SAVE_FAIL';

export const saveValue = (categoryType, valueType, categoryId, value) => ({
  type: SAVE_BUDGET,
  payload: { categoryId, categoryType, valueType, value }
});
export const loadBudget = (year, month, values) => ({
  type: LOAD_ENCRYPTED_BUDGET,
  payload: { year, month, values }
});
export const decryptBudget = (year, month, entries) => ({
  type: DECRYPT_BUDGET,
  payload: { year, month, entries }
});
export const decryptBudgetEntry = (budget, year, month, entry) => ({
  type: DECRYPT_BUDGET_ENTRY,
  payload: { budget, year, month, entry }
});
export const updateBudgetEntry = (year, month, categoryId, value) => ({
  type: UPDATE_BUDGET_ENTRY,
  payload: { year, month, categoryId, value }
});
export const addBudgetError = (error) => ({
  type: ADD_BUDGET_ERROR,
  payload: {},
  error
});
export const clearBudgetErrors = () => ({
  type: CLEAR_BUDGET_ERRORS,
  payload: {},
});
