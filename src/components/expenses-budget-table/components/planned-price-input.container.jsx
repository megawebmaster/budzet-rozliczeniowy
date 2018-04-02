import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { saveValue } from '../../budget';
import { month, year } from '../../location';
import { categoryExpenses } from '../expenses-budget-table.selectors';
import { expenseCategory } from '../../categories';

const mapStateToProps = (state, ownProps) => ({
  value: categoryExpenses(state, ownProps).planned,
  isSaving: categoryExpenses(state, ownProps).savingPlanned,
  average: expenseCategory(state, ownProps).averageValue,
  year: year(state),
  month: month(state),
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onUpdate: (year, month, value) => dispatch(saveValue('expense', 'planned', year, month, categoryId, value)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, stateProps.month, value),
});

// TODO: Translate "Średnio x zł"
const ExpensePlannedPriceInput = ({ disabled, placeholder, value, average, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} help={`Średnio: ${average} zł`} />
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExpensePlannedPriceInput);
