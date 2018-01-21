import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../PriceInput';
import * as BudgetActions from '../../stores/budget/BudgetAction';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const yearBudget = state.budget[state.location.payload.year] || { expenses: {} };
  const monthExpenses = yearBudget.expenses[state.location.payload.month] || {};
  const categoryExpenses = monthExpenses[ownProps.category.id] || { real: 0, savingReal: false };

  return {
    value: categoryExpenses.real,
    isSaving: categoryExpenses.savingReal,
    year: state.location.payload.year,
    month: state.location.payload.month,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, month, value) => dispatch(BudgetActions.updateRealExpense(year, month, ownProps.category.id, value)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, stateProps.month, value),
});

const ExpenseRealPriceInput = ({ disabled, placeholder, value, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} />
);
ExpenseRealPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
ExpenseRealPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExpenseRealPriceInput);
