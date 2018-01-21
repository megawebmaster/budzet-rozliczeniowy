import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../PriceInput';
import * as IrregularBudgetActions from '../../stores/irregular_budget/IrregularBudgetAction';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const irregularBudget = state.irregular_budget[state.location.payload.year] || {};
  const categoryPlan = irregularBudget[ownProps.category.id] || { planned: 0, savingPlanned: false };

  return {
    value: categoryPlan.planned,
    isSaving: categoryPlan.savingPlanned,
    year: state.location.payload.year,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, value) => dispatch(IrregularBudgetActions.updatePlannedIrregular(year, ownProps.category.id, value)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onChange: (value) => dispatchProps.onUpdate(stateProps.year, value),
});

const IrregularPlannedPriceInput = ({ disabled, placeholder, value, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={onChange}
         onMount={onMount} />
);
IrregularPlannedPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
IrregularPlannedPriceInput.propTypes = {
  category: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IrregularPlannedPriceInput);
