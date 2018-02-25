import { createSelector } from 'reselect';
import { expensesCategories, irregularCategories } from '../categories';

const flatMap = (items, fn) => [].concat.apply([], items.map(fn));

export const expensesCategoriesForDropdown = createSelector(
  [expensesCategories, irregularCategories],
  (categories, irregularCategories) => (
    flatMap(categories, category => (
      category.children.map(subcategory => ({
        text: `${category.name} - ${subcategory.name}`,
        value: subcategory.id,
      }))
    )).concat(
      // TODO: Proper translations of `Nieregularne`
      irregularCategories.map(category => ({
        text: `Nieregularne - ${category.name}`,
        value: category.id,
      }))
    )
  )
);
