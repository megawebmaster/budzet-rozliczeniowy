import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { updateRealIncome } from '../../budget';
import { month, year } from '../../location';
import { monthIncomeBudget } from '../income-budget-table.selectors';

const mapStateToProps = (state, ownProps) => {
  const monthIncome = monthIncomeBudget(state);
  const categoryIncome = monthIncome[ownProps.category.id] || { real: 0, savingReal: false };

  return {
    value: categoryIncome.real,
    isSaving: categoryIncome.savingReal,
    year: year(state),
    month: month(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, month, value) => dispatch(updateRealIncome(year, month, ownProps.category.id, value))
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, stateProps.month, value),
});

const IncomeRealPriceInput = ({ disabled, placeholder, value, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} />
);
IncomeRealPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
IncomeRealPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IncomeRealPriceInput);
