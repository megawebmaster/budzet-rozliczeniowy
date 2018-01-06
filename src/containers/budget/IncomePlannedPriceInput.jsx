import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/price-input/PriceInput';
import * as BudgetActions from '../../stores/budget/BudgetAction';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const yearBudget = state.budget[state.location.payload.year] || { income: {} };
  const monthIncome = yearBudget.income[state.location.payload.month] || {};
  const categoryIncome = monthIncome[ownProps.category.id] || { planned: 0, savingPlanned: false };

  return {
    value: categoryIncome.planned,
    isSaving: categoryIncome.savingPlanned,
    year: state.location.payload.year,
    month: state.location.payload.month,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, month, value) => dispatch(BudgetActions.updatePlannedIncome(year, month, ownProps.category.id, value)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, stateProps.month, value),
});

const IncomePlannedPriceInput = ({ disabled, placeholder, value, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} />
);
IncomePlannedPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
IncomePlannedPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IncomePlannedPriceInput);
