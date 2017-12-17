export const ADD_INCOME_CATEGORY = 'CategoriesAction.ADD_INCOME_CATEGORY';
export const ADD_EXPENSES_CATEGORY = 'CategoriesAction.ADD_EXPENSES_CATEGORY';
export const ADD_EXPENSES_SUBCATEGORY = 'CategoriesAction.ADD_EXPENSES_SUBCATEGORY';

export const addIncomeCategory = (name) => ({
  type: ADD_INCOME_CATEGORY,
  payload: { name }
});
export const addExpensesCategory = (name) => ({
  type: ADD_EXPENSES_CATEGORY,
  payload: { name }
});
export const addExpensesSubcategory = (categoryId, name) => ({
  type: ADD_EXPENSES_SUBCATEGORY,
  payload: { categoryId, name }
});
