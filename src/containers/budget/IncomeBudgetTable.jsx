import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';
import IncomePlannedPriceInput from './IncomePlannedPriceInput';
import IncomeRealPriceInput from './IncomeRealPriceInput';

const mapStateToProps = (state) => ({
  categories: state.categories.income || [],
  // TODO: Change data fetching into summary values passing
  data: (state.budget[state.location.payload.year] || { income: {} }).income[state.location.payload.month] || {},
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(CategoriesActions.addIncomeCategory(name)),
});

const IncomeBudgetTable = ({ label, categories, data, className, addCategory }) => (
  <BudgetTable className={className} label={label} categories={categories} data={data} editableRealValues={true}
               onAdd={addCategory} PlannedInput={IncomePlannedPriceInput} RealInput={IncomeRealPriceInput} />
);

IncomeBudgetTable.propTypes = {
  label: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeBudgetTable);

