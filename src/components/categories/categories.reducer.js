import * as Actions from './categories.actions';

const initialState = [];

const add = (state, type, name, parent) => {
  return [
    ...state,
    { id: Date.now(), type, name, parent }
  ];
};

const update = (state, type, original, category) => {
  const idx = state.findIndex(c => c.type === type && c.name === original.name && c.parent === original.parent);

  if (idx === -1) {
    throw new Error(`Invalid category: ${original.name}!`);
  }

  const result = state.slice();
  result.splice(idx, 1, category);

  return result;
};

const remove = (state, type, id) => {
  const idx = state.findIndex(c => c.id === id);

  if (idx === -1) {
    throw new Error(`Invalid category ID: ${id}!`);
  }

  const result = state.slice();
  result.splice(idx, 1);

  return result;
};

export const CategoriesReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_CATEGORIES:
      return action.payload.categories;
    case Actions.UPDATE_CATEGORY:
      return update(state, action.payload.type, action.payload.category, {
        ...action.payload.category,
        ...action.payload.values
      });
    case Actions.REPLACE_CATEGORY:
      return update(state, action.payload.type, action.payload.original, action.payload.saved);
    case Actions.REMOVE_CATEGORY:
      return remove(state, action.payload.type, action.payload.id);
    case Actions.ADD_CATEGORY:
      return add(state, action.payload.type, action.payload.name);
    default:
      return state;
  }
};
