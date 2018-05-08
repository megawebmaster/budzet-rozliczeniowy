export const LOAD_BUDGET = 'BudgetAction.LOAD_BUDGET';
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
  type: LOAD_BUDGET,
  payload: { year, month, values }
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
