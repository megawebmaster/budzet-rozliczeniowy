export const LOAD_IRREGULAR_BUDGET = 'IrregularBudgetAction.LOAD_IRREGULAR_BUDGET';
export const ADD_IRREGULAR_BUDGET_ERROR = 'IrregularBudgetAction.ADD_ERROR';
export const CLEAR_IRREGULAR_BUDGET_ERRORS = 'IrregularBudgetAction.CLEAR_ERRORS';
export const SAVE_IRREGULAR_BUDGET = 'IrregularBudgetAction.SAVE_IRREGULAR_PLANNED';
export const SAVING_IRREGULAR_BUDGET = 'IrregularBudgetAction.SAVING_IRREGULAR_BUDGET';
export const SAVE_IRREGULAR_SUCCESS = 'IrregularBudgetAction.SAVE_IRREGULAR_SUCCESS';
export const SAVE_IRREGULAR_FAIL = 'IrregularBudgetAction.SAVE_IRREGULAR_FAIL';

export const loadIrregularBudget = (year, values) => ({
  type: LOAD_IRREGULAR_BUDGET,
  payload: { year, values }
});
export const saveIrregularValue = (categoryId, value) => ({
  type: SAVE_IRREGULAR_BUDGET,
  payload: { categoryId, value }
});

export const addIrregularBudgetError = (error) => ({
  type: ADD_IRREGULAR_BUDGET_ERROR,
  payload: {},
  error
});

export const clearIrregularBudgetErrors = () => ({
  type: CLEAR_IRREGULAR_BUDGET_ERRORS,
  payload: {},
});
