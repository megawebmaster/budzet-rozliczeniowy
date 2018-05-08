import * as Actions from './expenses.actions';
import { ROUTE_EXPENSES_MONTH } from '../../routes';

const initialState = {
  loading: true,
  errors: [],
};

const loadMonth = (state, year, month, values) => {
  const selectedYear = state[year] || {};
  const result = values.map(expense => ({
    id: expense.id,
    category: expense.category.id,
    price: expense.value,
    day: expense.day,
    description: expense.description
  }));

  return { ...state, loading: false, [year]: { ...selectedYear, [month]: result } };
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
  selectedMonth.push({ ...value, saving: true });

  return { ...state, [year]: { ...selectedYear, [month]: selectedMonth } };
};

const saveItem = (state, year, month, value, isSaving) => {
  const selectedYear = state[year] || {};
  const selectedMonth = selectedYear[month].slice() || [];
  const idx = selectedMonth.findIndex(item => item.id === value.id);
  selectedMonth.splice(idx, 1, { ...value, saving: isSaving });

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
    case Actions.LOAD_EXPENSES:
      return loadMonth(state, action.payload.year, action.payload.month, action.payload.values);
    case Actions.ADD_ITEM:
      return addItem(state, action.payload.year, action.payload.month, action.payload.row);
    case Actions.SAVING_ROW:
      return saveItem(state, action.payload.year, action.payload.month, action.payload.row, true);
    case Actions.SAVE_ITEM_SUCCESS:
    case Actions.SAVE_ITEM_FAIL:
      // TODO: Error handling for failures?
      return saveItem(state, action.payload.year, action.payload.month, action.payload.row, false);
    case Actions.REMOVE_ITEM:
      return removeItem(state, action.payload.year, action.payload.month, action.payload.row);
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
