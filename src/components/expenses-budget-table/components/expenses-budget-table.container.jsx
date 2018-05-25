import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BudgetTable } from '../../budget-table';
import { addCategory, removeCategory, updateCategory } from '../../categories';
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

const mapDispatchToProps = (dispatch, { category }) => ({
  addSubcategory: (name) => dispatch(addCategory('expense', name, category.id)),
  onRemove: () => dispatch(removeCategory('expense', category)),
  onEdit: (name) => dispatch(updateCategory('expense', category, { name })),
});

const ExpensesBudgetTable = ({ category, currency, categories, summaryPlanned, summaryReal, className,
                               addSubcategory, onEdit, onRemove, onInputMount }) => (
  <BudgetTable category={category} className={className} categories={categories} editableRealValues={false}
               summaryPlanned={summaryPlanned} summaryReal={summaryReal} onAdd={addSubcategory} currency={currency}
               onInputMount={onInputMount} PlannedInput={ExpensePlannedPriceInput} RealInput={ExpenseRealPriceInput}
               onRemove={onRemove} onEdit={onEdit} />
);

ExpensesBudgetTable.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object.isRequired,
  onInputMount: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesBudgetTable);

