import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInputWithAverage as Input } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryExpenses } from '../expenses-budget-table.selectors';
import { expenseCategory } from '../../categories';

const mapStateToProps = (state, ownProps) => ({
  value: categoryExpenses(state, ownProps).planned,
  isSaving: categoryExpenses(state, ownProps).savingPlanned,
  average: expenseCategory(state, ownProps).averageValue,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('expense', 'planned', categoryId, value)),
});

const ExpensePlannedPriceInput = ({ disabled, placeholder, value, average, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} average={average} />
);
ExpensePlannedPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
ExpensePlannedPriceInput.propTypes = {
  categoryId: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensePlannedPriceInput);
