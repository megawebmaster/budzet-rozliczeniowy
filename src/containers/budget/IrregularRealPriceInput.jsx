import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/price-input/PriceInput';
import * as BudgetActions from '../../stores/budget/BudgetAction';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const yearBudget = state.budget[state.location.payload.year] || { irregular: {} };
  const categoryIncome = yearBudget.irregular[ownProps.category.id] || { real: 0 };

  return {
    value: categoryIncome.real,
    isSaving: false,
    year: state.location.payload.year,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, value) => dispatch(BudgetActions.updateRealIrregular(year, ownProps.category.id, value))
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, value),
});

const IrregularRealPriceInput = ({ disabled, placeholder, value, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} />
);
IrregularRealPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
IrregularRealPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IrregularRealPriceInput);
