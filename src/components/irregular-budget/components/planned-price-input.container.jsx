import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { categoryIrregularBudget } from '../irregular-budget.selectors';
import { saveIrregularValue } from '../irregular-budget.actions';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIrregularBudget(state, ownProps).planned,
  isSaving: categoryIrregularBudget(state, ownProps).savingPlanned,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveIrregularValue(categoryId, value)),
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

export default connect(mapStateToProps, mapDispatchToProps)(IrregularPlannedPriceInput);
