export const validate = (expense) => {
  const errors = {};

  if (expense.category.length === 0) {
    errors.category = 'errors.expense.category.required';
  }
  if (expense.price.length === 0) {
    errors.price = 'errors.expense.price.required';
  }
  if (expense.day.length === 0) {
    errors.day = 'errors.expense.day.required';
  }

  return errors;
};
