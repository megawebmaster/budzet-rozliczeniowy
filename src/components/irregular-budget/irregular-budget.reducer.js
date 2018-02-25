import * as Actions from './irregular-budget.actions';

const initialState = {};

const baseValue = { real: 0, savingReal: false, planned: 0, savingPlanned: false };
const updateValue = (state, action, value) => {
  const { year, categoryId } = action.payload;
  const selectedYear = state[year] || {};

  return {
    ...state,
    [year]: {
      ...selectedYear,
      [categoryId]: {
        ...(selectedYear[categoryId] || { ...baseValue }),
        ...value,
      },
    },
  };
};

export const IrregularBudgetReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.UPDATE_IRREGULAR_PLANNED:
      return updateValue(state, action, { planned: action.payload.value, savingPlanned: true});
    case Actions.IRREGULAR_PLANNED_SAVE_SUCCESS:
      return updateValue(state, action, { savingPlanned: false });
    case Actions.IRREGULAR_PLANNED_SAVE_FAIL:
      return updateValue(state, action, { savingPlanned: false, error: action.error });
    default:
      return state;
  }
};