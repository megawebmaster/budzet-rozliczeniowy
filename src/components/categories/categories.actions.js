export const LOAD_CATEGORIES = 'CategoriesAction.LOAD_CATEGORIES';
export const ADD_CATEGORY = 'CategoriesAction.ADD_CATEGORY';
export const UPDATE_CATEGORY = 'CategoriesAction.UPDATE_CATEGORY';
export const REMOVE_CATEGORY = 'CategoriesAction.REMOVE_CATEGORY';

export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  payload: { categories }
});
export const updateCategory = (type, original, saved) => ({
  type: UPDATE_CATEGORY,
  payload: { type, original, saved }
});
export const removeCategory = (type, id) => ({
  type: REMOVE_CATEGORY,
  payload: { type, id }
});
export const addCategory = (type, name, parentId = null) => ({
  type: ADD_CATEGORY,
  payload: { type, name, parentId }
});
