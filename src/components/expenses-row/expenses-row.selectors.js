import { createSelector } from 'reselect';
import { expensesCategories } from '../categories';

const flatMap = (items, fn) => [].concat.apply([], items.map(fn));

export const expensesCategoriesForDropdown = createSelector(
  [expensesCategories],
  (categories) => (
    flatMap(categories, (category) => (
      category.children.map((subcategory) => ({
        text: `${category.name} - ${subcategory.name}`,
        value: subcategory.id
      }))
    ))
  )
);
