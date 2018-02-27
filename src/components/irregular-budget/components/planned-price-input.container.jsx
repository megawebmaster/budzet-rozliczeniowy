import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { year } from '../../location';
import { categoryIrregularBudget } from '../irregular-budget.selectors';
import { saveIrregularValue } from '../irregular-budget.actions';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIrregularBudget(state, ownProps).planned,
  isSaving: categoryIrregularBudget(state, ownProps).savingPlanned,
  year: year(state),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdate: (year, value) => dispatch(saveIrregularValue(year, ownProps.categoryId, value)),
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
  categoryId: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IrregularPlannedPriceInput);
