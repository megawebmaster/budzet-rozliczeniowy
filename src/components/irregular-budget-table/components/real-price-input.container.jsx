import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { categoryIrregular } from '../irregular-budget-table.selectors';
import { year } from '../../location';

const mapStateToProps = (state, ownProps) => ({
  value: categoryIrregular(state, ownProps).real,
  year: year(state),
});

const emptyFunc = () => {};

const IrregularRealPriceInput = ({ placeholder, value, onMount }) => (
  <Input value={value} disabled={true} isSaving={false} placeholder={placeholder} onChange={emptyFunc}
         onMount={onMount} />
);
IrregularRealPriceInput.defaultProps = {
  onMount: (_type, _category, _input) => {},
  placeholder: '',
};
IrregularRealPriceInput.propTypes = {
  categoryId: PropTypes.any.isRequired,
  onMount: PropTypes.func,
  placeholder: PropTypes.string,
};

export default connect(mapStateToProps)(IrregularRealPriceInput);
