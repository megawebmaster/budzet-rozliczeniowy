import * as Actions from './budget.actions';
import { upperFirst } from './budget.helpers';
import { ROUTE_BUDGET_MONTH } from '../../routes';

const initialState = {
  loading: true,
};

const baseValue = { real: 0, savingReal: false, errorReal: '', planned: 0, savingPlanned: false, errorPlanned: '' };
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

// TODO: Get rid of type in hash - move it elsewhere
// TODO: Improve recalculating trees - update only required branches (reselect + immutable)
const loadMonth = (state, year, month, values) => {
  const selectedYear = state[year] || { income: {}, expense: {}, irregular: {} };

  const monthValues = { income: {}, expense: {}, irregular: {} };
  values.forEach(entry => {
    monthValues[entry.category.type][entry.category.id] = {
      ...baseValue,
      planned: entry.plan,
      real: entry.real,
    }
  });

  return {
    ...state,
    loading: false,
    [year]: {
      ...selectedYear,
      income: {
        ...selectedYear.income,
        [month]: monthValues.income
      },
      expense: {
        ...selectedYear.expense,
        [month]: monthValues.expense
      },
      irregular: {
        ...selectedYear.irregular,
        [month]: monthValues.irregular
      },
    }
  };
};

export const BudgetReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_BUDGET:
      return loadMonth(state, action.payload.year, action.payload.month, action.payload.values);
    case Actions.SAVING_BUDGET:
      return updateValue(state, action.payload.categoryType, action.payload.valueType, action.payload, true);
    case Actions.SAVE_SUCCESS:
      return updateValue(state, action.payload.categoryType, action.payload.valueType, action.payload, false);
    case Actions.SAVE_FAIL:
      return addValueError(state, action.payload.categoryType, action.payload.valueType, action.payload, action.error);
    case ROUTE_BUDGET_MONTH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
