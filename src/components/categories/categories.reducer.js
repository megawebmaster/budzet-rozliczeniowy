import * as Actions from './categories.actions';

const initialState = {
  loading: true,
  data: []
};

const add = (state, id, type, name, parentId) => {
  const parent = parentId ? {id: parentId} : null;

  return {
    ...state,
    data: [
      ...state.data,
      { id, startedAt: null, deletedAt: null, averageValues: [], children: [], saving: true, type, name, parent }
    ]
  };
};

const update = (state, type, original, category) => {
  const idx = state.data.findIndex(c => c.id === original.id);

  if (idx === -1) {
    throw new Error(`Invalid category: ${original.name}!`);
  }

  const result = state.slice();
  result.splice(idx, 1, category);

  return { ...state, data: result };
};

const remove = (state, type, id) => {
  const idx = state.data.findIndex(c => c.id === id);

  if (idx === -1) {
    throw new Error(`Invalid category ID: ${id}!`);
  }

  const result = state.slice();
  result.splice(idx, 1);

  return { ...state, data: result };
};

export const CategoriesReducer = (state = initialState, action) => {
  switch(action.type){
    case Actions.LOAD_CATEGORIES:
      return { loading: false, data: action.payload.categories };
    case Actions.UPDATE_CATEGORY:
      return update(state, action.payload.type, action.payload.category, {
        ...action.payload.category,
        ...action.payload.values,
        saving: true,
      });
    case Actions.REPLACE_CATEGORY:
      return update(state, action.payload.type, action.payload.original, { ...action.payload.saved, saving: false });
    case Actions.REMOVE_CATEGORY:
      return remove(state, action.payload.type, action.payload.id);
    case Actions.ADD_CATEGORY:
      return add(state, action.payload.id, action.payload.type, action.payload.name, action.payload.parentId);
    default:
      return state;
  }
};
