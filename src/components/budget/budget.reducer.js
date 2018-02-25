import * as Actions from './budget.actions';
import { upperFirst } from './budget.helpers';

const initialState = {};

const baseValue = { real: 0, savingReal: false, planned: 0, savingPlanned: false };
const getValue = (state, categoryType, month, year, categoryId) => {
  const selectedYear = state[year] || { income: {}, expense: {}, irregular: {} };
  const selectedYearType = selectedYear[categoryType] || {};
  const selectedYearTypeMonth = selectedYearType[month] || {};
  return selectedYearTypeMonth[categoryId] || { ...baseValue };
};
const setValue = (state, categoryType, month, year, categoryId, value) => {
  const selectedYear = state[year] || { income: {}, expense: {}, irregular: {} };
  const selectedYearType = selectedYear[categoryType] || {};
  const selectedYearTypeMonth = selectedYearType[month] || {};

  return {
    ...state,
    [year]: {
      ...selectedYear,
      [categoryType]: {
        ...selectedYear[categoryType],
        [month]: {
          ...selectedYearTypeMonth,
          [categoryId]: value,
        },
      },
    },
  };
};

const updateValue = (state, categoryType, valueType, data, isSaving) => {
  const { month, year, categoryId, value } = data;
  const valueObject = {
    ...(getValue(state, categoryType, month, year, categoryId)),
    [valueType]: value,
    [`saving${upperFirst(valueType)}`]: isSaving
  };

  return setValue(state, categoryType, month, year, categoryId, valueObject);
};

const addValueError = (state, categoryType, valueType, data, error) => {
  const { month, year, categoryId } = data;
  const valueObject = {
    ...(getValue(state, categoryType, month, year, categoryId)),
    error,
    [`saving${upperFirst(valueType)}`]: false
  };

  return setValue(state, categoryType, month, year, categoryId, valueObject);
};

export const BudgetReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.SAVING_BUDGET:
      return updateValue(state, action.payload.categoryType, action.payload.valueType, action.payload, true);
    case Actions.SAVE_SUCCESS:
      return updateValue(state, action.payload.categoryType, action.payload.valueType, action.payload, false);
    case Actions.SAVE_FAIL:
      return addValueError(state, action.payload.categoryType, action.payload.valueType, action.payload, action.error);
    default:
      return state;
  }
};
