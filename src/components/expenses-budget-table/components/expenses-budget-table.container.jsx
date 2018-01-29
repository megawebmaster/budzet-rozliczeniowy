import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BudgetTable } from '../../budget-table';
import { addExpensesSubcategory, expensesCategories } from '../../categories';
import { currencyType } from '../../configuration';

import { expensesPlannedSummaries, expensesRealSummaries } from '../expenses-budget-table.selectors';
import ExpensePlannedPriceInput from './planned-price-input.container';
import ExpenseRealPriceInput from './real-price-input.container';

const mapStateToProps = (state, ownProps) => {
  const category = expensesCategories(state).find((c) => c.id === ownProps.categoryId) || { children: [] };
  const plannedSummaries = expensesPlannedSummaries(state);
  const realSummaries = expensesRealSummaries(state);

  return {
    categories: category.children,
    currency: currencyType(state),
    summaryPlanned: plannedSummaries[ownProps.categoryId] || 0.0,
    summaryReal: realSummaries[ownProps.categoryId] || 0.0,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSubcategory: (name) => dispatch(addExpensesSubcategory(ownProps.categoryId, name)),
});

const ExpensesBudgetTable = ({ label, currency, categories, summaryPlanned, summaryReal, className, addSubcategory,
                               onInputMount }) => (
  <BudgetTable className={className} label={label} categories={categories} editableRealValues={false}
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

