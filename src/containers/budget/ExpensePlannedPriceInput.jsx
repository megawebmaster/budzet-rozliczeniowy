import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/price-input/PriceInput';
import * as BudgetActions from '../../stores/budget/BudgetAction';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const yearBudget = state.budget[state.location.payload.year] || { expenses: {} };
  const monthExpenses = yearBudget.expenses[state.location.payload.month] || {};
  const categoryExpenses = monthExpenses[ownProps.category.id] || { planned: 0, savingPlanned: false };

  return {
    value: categoryExpenses.planned,
    isSaving: categoryExpenses.savingPlanned,
    year: state.location.payload.year,
    month: state.location.payload.month,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, month, value) => dispatch(BudgetActions.updatePlannedExpense(year, month, ownProps.category.id, value)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, stateProps.month, value),
});

const ExpensePlannedPriceInput = ({ disabled, placeholder, value, isSaving, onChange }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange} />
);
ExpensePlannedPriceInput.defaultProps = {
  disabled: false,
  placeholder: '',
};
ExpensePlannedPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExpensePlannedPriceInput);
