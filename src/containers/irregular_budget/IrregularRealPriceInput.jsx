import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/price-input/PriceInput';

const mapStateToProps = (state, ownProps) => {
  // TODO: Move fetching data into reselect!
  const irregularBudget = state.irregular_budget[state.location.payload.year] || {};
  const categoryPlan = irregularBudget[ownProps.category.id] || { real: 0 };

  return {
    value: categoryPlan.real,
    isSaving: false,
    year: state.location.payload.year,
  };
};
const mapDispatchToProps = () => ({
  onChange: () => {},
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

export default connect(mapStateToProps, mapDispatchToProps)(IrregularRealPriceInput);
