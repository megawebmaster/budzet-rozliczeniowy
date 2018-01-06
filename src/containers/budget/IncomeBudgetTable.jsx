import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';
import IncomePlannedPriceInput from './IncomePlannedPriceInput';
import IncomeRealPriceInput from './IncomeRealPriceInput';

const mapStateToProps = (state) => ({
  // TODO: Change data fetching into summary values passing
  data: (state.budget[state.location.payload.year] || { income: {} }).income[state.location.payload.month] || {},
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(CategoriesActions.addIncomeCategory(name)),
});

const IncomeBudgetTable = ({ label, categories, data, className, addCategory, onInputMount }) => (
  <BudgetTable className={className} label={label} categories={categories} data={data} editableRealValues={true}
               onAdd={addCategory} onInputMount={onInputMount} PlannedInput={IncomePlannedPriceInput}
               RealInput={IncomeRealPriceInput} />
);

IncomeBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
IncomeBudgetTable.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  onInputMount: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeBudgetTable);

