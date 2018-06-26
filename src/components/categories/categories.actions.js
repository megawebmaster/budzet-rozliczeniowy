export const LOAD_ENCRYPTED_CATEGORIES = 'CategoriesAction.LOAD_ENCRYPTED_CATEGORIES';
export const DECRYPT_CATEGORIES = 'CategoriesAction.DECRYPT_CATEGORIES';

export const ADD_CATEGORY = 'CategoriesAction.ADD_CATEGORY';
export const SET_CATEGORY_ERROR = 'CategoriesAction.SET_CATEGORY_ERROR';
export const UPDATE_CATEGORY = 'CategoriesAction.UPDATE_CATEGORY';
export const REPLACE_CATEGORY = 'CategoriesAction.REPLACE_CATEGORY';
export const REMOVE_CATEGORY = 'CategoriesAction.REMOVE_CATEGORY';
export const REMOVE_CATEGORY_ERROR = 'CategoriesAction.REMOVE_CATEGORY_ERROR';

export const loadCategories = (categories) => ({
  type: LOAD_ENCRYPTED_CATEGORIES,
  payload: { categories }
});
export const decryptCategories = (categories) => ({
  type: DECRYPT_CATEGORIES,
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
export const removeCategory = (type, category) => ({
  type: REMOVE_CATEGORY,
  payload: { type, category }
});
export const addCategory = (type, name, parentId = null) => ({
  type: ADD_CATEGORY,
  payload: { id: Date.now(), type, name, parentId }
});
export const setCategoryError = (category, error) => ({
  type: SET_CATEGORY_ERROR,
  payload: { category },
  error
});
export const removeCategoryError = (category, error) => ({
  type: REMOVE_CATEGORY_ERROR,
  payload: { category },
  error
});
