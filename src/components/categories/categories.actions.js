export const LOAD_CATEGORIES = 'CategoriesAction.LOAD_CATEGORIES';
export const ADD_CATEGORY = 'CategoriesAction.ADD_CATEGORY';
export const SET_CATEGORY_ERROR = 'CategoriesAction.SET_CATEGORY_ERROR';
export const UPDATE_CATEGORY = 'CategoriesAction.UPDATE_CATEGORY';
export const REPLACE_CATEGORY = 'CategoriesAction.REPLACE_CATEGORY';
export const REMOVE_CATEGORY = 'CategoriesAction.REMOVE_CATEGORY';

export const loadCategories = (categories) => ({
  type: LOAD_CATEGORIES,
  payload: { categories }
});
export const updateCategory = (type, category, values) => ({
  type: UPDATE_CATEGORY,
  payload: { type, category, values }
});
export const replaceCategory = (type, original, saved) => ({
  type: REPLACE_CATEGORY,
  payload: { type, original, saved }
});
export const removeCategory = (type, id) => ({
  type: REMOVE_CATEGORY,
  payload: { type, id }
});
export const addCategory = (type, name, parentId = null) => ({
  type: ADD_CATEGORY,
  payload: { id: Date.now(), type, name, parentId }
});
export const setCategoryError = (category, error) => ({
  type: SET_CATEGORY_ERROR,
  payload: { category, error }
});
