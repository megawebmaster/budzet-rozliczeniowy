export const SAVE_IRREGULAR_PLANNED = 'IrregularBudgetAction.SAVE_IRREGULAR_PLANNED';
export const UPDATE_IRREGULAR_PLANNED = 'IrregularBudgetAction.UPDATE_IRREGULAR_PLANNED';
export const IRREGULAR_PLANNED_SAVE_SUCCESS = 'IrregularBudgetAction.IRREGULAR_PLANNED_SAVE_SUCCESS';
export const IRREGULAR_PLANNED_SAVE_FAIL = 'IrregularBudgetAction.IRREGULAR_PLANNED_SAVE_FAIL';

export const updatePlannedIrregular = (year, categoryId, value) => ({
  type: SAVE_IRREGULAR_PLANNED,
  payload: { year, categoryId, value }
});
