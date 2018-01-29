import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { year } from '../../location';
import { categoryIrregularBudget } from '../irregular-budget.selectors';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIrregularBudget(state, ownProps).real,
  year: year(state),
});
const emptyFunc = () => {};

const IrregularRealPriceInput = ({ disabled, placeholder, value, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={false} placeholder={placeholder} onChange={emptyFunc}
         onMount={onMount} />
);
IrregularRealPriceInput.defaultProps = {
  disabled: false,
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
IrregularRealPriceInput.propTypes = {
  categoryId: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps)(IrregularRealPriceInput);
