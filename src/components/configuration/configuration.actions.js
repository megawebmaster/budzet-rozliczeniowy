export const YEARS_UPDATED = 'ConfigurationAction.YEARS_UPDATED';

export const updateYears = (years) => ({
  type: YEARS_UPDATED,
  payload: { years }
});
