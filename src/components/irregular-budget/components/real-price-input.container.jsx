import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PriceInput as Input } from '../../price-input';
import { irregularYearBudget } from '../irregular-budget.selectors';
import { year } from '../../location';

const mapStateToProps = (state, ownProps) => {
  const irregularBudget = irregularYearBudget(state);
  const categoryPlan = irregularBudget[ownProps.category.id] || { real: 0 };

  return {
    value: categoryPlan.real,
    isSaving: false,
    year: year(state),
  };
};
const emptyFunc = () => {};

const IrregularRealPriceInput = ({ disabled, placeholder, value, isSaving, onChange, onMount }) => (
  <Input value={value} disabled={disabled} isSaving={isSaving} placeholder={placeholder} onChange={emptyFunc}
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

export default connect(mapStateToProps)(IrregularRealPriceInput);
