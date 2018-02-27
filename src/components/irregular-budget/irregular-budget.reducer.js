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
const loadIrregularBudget = (state, year, values) => {
  const selectedYear = state[year] || {};
  const result = {};

  values.forEach(entry => {
    result[entry.category.id] = {
      ...baseValue,
      planned: entry.plan,
      real: entry.real,
    }
  });

  return {
    ...state,
    [year]: {
      ...selectedYear,
      ...result
    }
  };
};

export const IrregularBudgetReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_IRREGULAR_BUDGET:
      return loadIrregularBudget(state, action.payload.year, action.payload.values);
    case Actions.SAVING_IRREGULAR_BUDGET:
      return updateValue(state, action, { planned: action.payload.value, savingPlanned: true});
    case Actions.SAVE_IRREGULAR_SUCCESS:
      return updateValue(state, action, { savingPlanned: false });
    case Actions.SAVE_IRREGULAR_FAIL:
      return updateValue(state, action, { savingPlanned: false, error: action.error });
    default:
      return state;
  }
};
