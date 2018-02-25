import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { update } from '../../budget';
import { month, year } from '../../location';
import { categoryExpenses } from '../expenses-budget-table.selectors';

const mapStateToProps = (state, ownProps) => ({
  value: categoryExpenses(state, ownProps).planned,
  isSaving: categoryExpenses(state, ownProps).savingPlanned,
  year: year(state),
  month: month(state),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, month, value) => dispatch(update('expense', 'planned', year, month, ownProps.categoryId, value)),
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
  categoryId: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExpensePlannedPriceInput);
