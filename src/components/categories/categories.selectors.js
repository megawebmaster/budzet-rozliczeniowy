// import createSelector from 'reselect';

export const incomeCategories = (state) => state.categories.income || [];
export const expensesCategories = (state) => state.categories.expenses || [];
export const irregularCategories = (state) => state.categories.irregular || [];

// export const incomeCategoriesIds = createSelector(
//   incomeCategories, (categories) => categories.map((category) => category.id.toString())
// );
// export const expensesCategoriesIds = createSelector(
//   expensesCategories, (categories) => categories.map((category) => category.id.toString())
// );

