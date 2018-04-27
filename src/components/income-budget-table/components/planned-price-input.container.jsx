import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { saveValue } from '../../budget';
import { categoryIncome } from '../income-budget-table.selectors';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIncome(state, ownProps).planned,
  isSaving: categoryIncome(state, ownProps).savingPlanned,
});
const mapDispatchToProps = (dispatch, { categoryId }) => ({
  onChange: (value) => dispatch(saveValue('income', 'planned', categoryId, value)),
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
  categoryId: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomePlannedPriceInput);
