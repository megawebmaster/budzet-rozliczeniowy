export const SAVE_BUDGET = 'BudgetAction.SAVE_BUDGET';
export const SAVING_BUDGET = 'BudgetAction.UPDATE_BUDGET';
export const SAVE_SUCCESS = 'BudgetAction.SAVE_SUCCESS';
export const SAVE_FAIL = 'BudgetAction.SAVE_FAIL';

export const update = (categoryType, valueType, year, month, categoryId, value) => ({
  type: SAVE_BUDGET,
  payload: { year, month, categoryId, categoryType, valueType, value }
});
