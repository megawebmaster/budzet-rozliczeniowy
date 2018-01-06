import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';
import ExpensePlannedPriceInput from './ExpensePlannedPriceInput';
import ExpenseRealPriceInput from './ExpenseRealPriceInput';

const mapStateToProps = (state, ownProps) => ({
  categories: (state.categories.expenses.find((category) => category.id === ownProps.categoryId) || { children: [] }).children,
  // TODO: Change data fetching into summary values passing
  data: (state.budget[state.location.payload.year] || { expenses: {} }).expenses[state.location.payload.month] || {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSubcategory: (name) => dispatch(CategoriesActions.addExpensesSubcategory(ownProps.categoryId, name)),
});

const ExpensesBudgetTable = ({ label, categories, data, className, addSubcategory, onInputMount }) => (
  <BudgetTable className={className} label={label} categories={categories} data={data} editableRealValues={false}
               onAdd={addSubcategory} onInputMount={onInputMount} PlannedInput={ExpensePlannedPriceInput}
               RealInput={ExpenseRealPriceInput} />
);

ExpensesBudgetTable.propTypes = {
  className: PropTypes.string,
  categoryId: PropTypes.number.isRequired,
  onInputMount: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesBudgetTable);

