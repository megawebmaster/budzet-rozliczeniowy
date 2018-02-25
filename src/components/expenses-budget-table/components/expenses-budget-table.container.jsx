import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BudgetTable } from '../../budget-table';
import { addCategory } from '../../categories';
import { currencyType } from '../../configuration';

import {
  expensesTableCategories,
  expensesTablePlannedSummary,
  expensesTableRealSummary
} from '../expenses-budget-table.selectors';
import ExpensePlannedPriceInput from './planned-price-input.container';
import ExpenseRealPriceInput from './real-price-input.container';

const mapStateToProps = (state, ownProps) => ({
  categories: expensesTableCategories(state, ownProps),
  currency: currencyType(state),
  summaryPlanned: expensesTablePlannedSummary(state, ownProps),
  summaryReal: expensesTableRealSummary(state, ownProps),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSubcategory: (name) => dispatch(addCategory('expense', name, ownProps.categoryId)),
});

const ExpensesBudgetTable = ({ label, currency, categories, summaryPlanned, summaryReal, className, addSubcategory,
                               onInputMount }) => (
  <BudgetTable type="expenses" className={className} label={label} categories={categories} editableRealValues={false}
               summaryPlanned={summaryPlanned} summaryReal={summaryReal} onAdd={addSubcategory} currency={currency}
               onInputMount={onInputMount} PlannedInput={ExpensePlannedPriceInput} RealInput={ExpenseRealPriceInput} />
);

ExpensesBudgetTable.propTypes = {
  className: PropTypes.string,
  categoryId: PropTypes.number.isRequired,
  onInputMount: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesBudgetTable);

