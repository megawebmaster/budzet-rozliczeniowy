import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/price-input/PriceInput';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const yearBudget = state.budget[state.location.payload.year] || { expenses: {} };
  const monthExpenses = yearBudget.expenses[state.location.payload.month] || {};
  const categoryExpenses = monthExpenses[ownProps.category.id] || { real: 0, savingReal: false };

  return {
    value: categoryExpenses.real,
    isSaving: categoryExpenses.savingReal,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (value) => { console.log('update expenses for real', ownProps.category.id, value); }
});

const ExpenseRealPriceInput = ({ disabled, placeholder, value, isSaving, onUpdate }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onUpdate} />
);
ExpenseRealPriceInput.defaultProps = {
  disabled: false,
  placeholder: '',
};
ExpenseRealPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRealPriceInput);
