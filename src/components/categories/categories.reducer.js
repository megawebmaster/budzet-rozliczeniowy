import * as Actions from './categories.actions';
import { ADD_BUDGET_ERROR } from '../budget/budget.actions';
import { ADD_IRREGULAR_BUDGET_ERROR } from '../irregular-budget/irregular-budget.actions';
import { ADD_EXPENSES_ERROR } from '../expenses/expenses.actions';

const initialState = {
  loading: true,
  data: []
};

const add = (state, category) => {
  const { parentId, ...values } = category;
  const parent = parentId ? {id: parentId} : null;

  return {
    ...state,
    data: [
      ...state.data,
      {
        startedAt: null,
        deletedAt: null,
        averageValues: [],
        children: [],
        saved: false,
        saving: true,
        error: '',
        deleteError: '',
        parent,
        ...values,
      }
    ]
  };
};

const update = (state, type, original, values) => {
  const idx = state.data.findIndex(c => c.id === original.id);

  if (idx === -1) {
    throw new Error(`Invalid category: ${original.name}!`);
  }

  const result = state.data.slice();
  result.splice(idx, 1, { ...state.data[idx], ...values });

  return { ...state, data: result };
};

const remove = (state, type, id) => {
  const idx = state.data.findIndex(c => c.id === id);

  if (idx === -1) {
    throw new Error(`Invalid category ID: ${id}!`);
  }

  const result = state.data.slice();
  result.splice(idx, 1);

  return { ...state, data: result };
};

export const CategoriesReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_ENCRYPTED_CATEGORIES:
      return { loading: false, data: action.payload.categories };
    case Actions.UPDATE_CATEGORY:
      return update(state, action.payload.type, action.payload.category, {
        ...action.payload.values,
        saving: true,
        error: '',
        deleteError: '',
      });
    case Actions.REPLACE_CATEGORY:
      return update(state, action.payload.type, action.payload.original, {
        ...action.payload.saved,
        saving: false,
        saved: action.payload.saved.id < 1000000000000
      });
    case Actions.REMOVE_CATEGORY:
      return remove(state, action.payload.type, action.payload.category.id);
    case Actions.REMOVE_CATEGORY_ERROR:
      return add(state, { ...action.payload.category, deleteError: action.error });
    case Actions.ADD_CATEGORY:
      return add(state, action.payload);
    case Actions.SET_CATEGORY_ERROR:
      return update(state, action.payload.type, action.payload.category, {
        saving: false,
        error: action.error
      });
    case ADD_BUDGET_ERROR:
    case ADD_IRREGULAR_BUDGET_ERROR:
    case ADD_EXPENSES_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};
