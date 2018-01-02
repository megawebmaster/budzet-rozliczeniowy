import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/price-input/PriceInput';
import * as BudgetActions from '../../stores/budget/BudgetAction';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const yearBudget = state.budget[state.location.payload.year] || { income: {} };
  const monthIncome = yearBudget.income[state.location.payload.month] || {};
  const categoryIncome = monthIncome[ownProps.category.id] || { real: 0, savingReal: false };

  return {
    value: categoryIncome.real,
    isSaving: categoryIncome.savingReal,
    year: state.location.payload.year,
    month: state.location.payload.month,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, month, value) => dispatch(BudgetActions.updateRealIncome(year, month, ownProps.category.id, value))
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, stateProps.month, value),
});

const IncomeRealPriceInput = ({ disabled, placeholder, value, isSaving, onChange }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange} />
);
IncomeRealPriceInput.defaultProps = {
  disabled: false,
  placeholder: '',
};
IncomeRealPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IncomeRealPriceInput);
