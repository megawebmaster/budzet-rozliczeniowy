import * as Actions from './irregular-budget.actions';
import { ROUTE_BUDGET_IRREGULAR } from '../../routes';

const initialState = {
  loading: true,
  errors: [],
};

const baseValue = { real: 0, savingReal: false, errorReal: '', planned: 0, savingPlanned: false, errorPlanned: '' };
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
      monthlyRealValues: entry.monthlyRealValues,
    }
  });

  return {
    ...state,
    loading: false,
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
      return updateValue(state, action, { planned: action.payload.value, savingPlanned: true, errorPlanned: '' });
    case Actions.SAVE_IRREGULAR_SUCCESS:
      return updateValue(state, action, { savingPlanned: false });
    case Actions.SAVE_IRREGULAR_FAIL:
      return updateValue(state, action, { savingPlanned: false, errorPlanned: action.error });
    case Actions.ADD_IRREGULAR_BUDGET_ERROR:
      return { ...state, errors: [...state.errors, action.error], loading: false };
    case Actions.CLEAR_IRREGULAR_BUDGET_ERRORS:
      return { ...state, errors: [] };
    case ROUTE_BUDGET_IRREGULAR:
      return { ...state, loading: true };
    default:
      return state;
  }
};
