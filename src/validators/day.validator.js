export const validate = (value, { year, month }) => {
  if (value.length === 0) {
    return value;
  }

  const day = parseInt(value, 10);
  const date = new Date(year, month - 1, day);

  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    throw new Error('validation.day');
  }

  return value;
};
