import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { updatePlannedExpense } from '../../budget';
import { month, year } from '../../location';
import { monthExpensesBudget } from '../expenses-budget-table.selectors';

const mapStateToProps = (state, ownProps) => {
  const monthExpenses = monthExpensesBudget(state);
  const categoryExpenses = monthExpenses[ownProps.category.id] || { planned: 0, savingPlanned: false };

  return {
    value: categoryExpenses.planned,
    isSaving: categoryExpenses.savingPlanned,
    year: year(state),
    month: month(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, month, value) => dispatch(updatePlannedExpense(year, month, ownProps.category.id, value)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, stateProps.month, value),
});

const ExpensePlannedPriceInput = ({ disabled, placeholder, value, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} />
);
ExpensePlannedPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
ExpensePlannedPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExpensePlannedPriceInput);
