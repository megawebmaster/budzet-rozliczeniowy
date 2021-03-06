import * as Actions from './expenses.actions';
import { ROUTE_EXPENSES_MONTH } from '../../routes';

const initialState = {
  loading: true,
  errors: [],
};

const loadMonth = (state, year, month, values) => {
  const selectedYear = state[year] || {};

  return { ...state, loading: false, [year]: { ...selectedYear, [month]: values } };
};

const sortItems = (state, year, month, field) => {
  const selectedYear = state[year] || {};
  const selectedMonth = selectedYear[month].slice() || [];
  const sortedMonth = selectedMonth.sort((a, b) => a[field] < b[field] ? -1 : 1);

  return { ...state, [year]: { ...selectedYear, [month]: sortedMonth } };
};

const addItem = (state, year, month, value) => {
  const selectedYear = state[year] || {};
  const selectedMonth = selectedYear[month].slice() || [];

  return { ...state, [year]: { ...selectedYear, [month]: [value, ...selectedMonth] } };
};

const saveItem = (state, year, month, current, values) => {
  const selectedYear = state[year] || {};
  const selectedMonth = selectedYear[month].slice() || [];
  const idx = selectedMonth.findIndex(item => item.id === current.id);
  selectedMonth.splice(idx, 1, { ...selectedMonth[idx], ...values });

  return { ...state, [year]: { ...selectedYear, [month]: selectedMonth } };
};

const removeItem = (state, year, month, value) => {
  const selectedYear = state[year] || {};
  const selectedMonth = selectedYear[month].slice() || [];
  const idx = selectedMonth.findIndex(item => item.id === value.id);
  selectedMonth.splice(idx, 1);

  return { ...state, [year]: { ...selectedYear, [month]: selectedMonth } };
};

export const ExpensesReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_ENCRYPTED_EXPENSES:
      return loadMonth(state, action.payload.year, action.payload.month, action.payload.values);
    case Actions.ADD_ITEM:
      return addItem(state, action.payload.year, action.payload.month, {
        ...action.payload.row,
        saved: false,
        saving: true
      });
    case Actions.SAVING_ROW:
      return saveItem(state, action.payload.year, action.payload.month, action.payload.row, {
        ...action.payload.row,
        errors: {},
        saving: true
      });
    case Actions.SAVE_ITEM_SUCCESS:
      return saveItem(state, action.payload.year, action.payload.month, action.payload.current, {
        ...action.payload.saved,
        errors: {},
        saved: true,
        saving: false
      });
    case Actions.SAVE_ITEM_FAIL:
      return saveItem(state, action.payload.year, action.payload.month, action.payload.row, {
        errors: action.error,
        saving: false
      });
    case Actions.REMOVE_ITEM:
      return removeItem(state, action.payload.year, action.payload.month, action.payload.row);
    case Actions.REMOVE_ITEM_FAIL:
      return addItem(state, action.payload.year, action.payload.month, {
        ...action.payload.row,
        errors: { base: action.error },
        saving: false
      });
    case Actions.SORT_EXPENSES:
      return sortItems(state, action.payload.year, action.payload.month, action.payload.field);
    case Actions.ADD_EXPENSES_ERROR:
      return { ...state, errors: [...state.errors, action.error], loading: false };
    case Actions.CLEAR_EXPENSES_ERRORS:
      return { ...state, errors: [] };
    case ROUTE_EXPENSES_MONTH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
