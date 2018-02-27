export const LOAD_IRREGULAR_BUDGET = 'IrregularBudgetAction.LOAD_IRREGULAR_BUDGET';
export const SAVE_IRREGULAR_BUDGET = 'IrregularBudgetAction.SAVE_IRREGULAR_PLANNED';
export const SAVING_IRREGULAR_BUDGET = 'IrregularBudgetAction.SAVING_IRREGULAR_BUDGET';
export const SAVE_IRREGULAR_SUCCESS = 'IrregularBudgetAction.SAVE_IRREGULAR_SUCCESS';
export const SAVE_IRREGULAR_FAIL = 'IrregularBudgetAction.SAVE_IRREGULAR_FAIL';

export const loadIrregularBudget = (year, values) => ({
  type: LOAD_IRREGULAR_BUDGET,
  payload: { year, values }
});
export const saveIrregularValue = (year, categoryId, value) => ({
  type: SAVE_IRREGULAR_BUDGET,
  payload: { year, categoryId, value }
});
