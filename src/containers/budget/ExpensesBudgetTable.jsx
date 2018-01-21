import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';
import ExpensePlannedPriceInput from './ExpensePlannedPriceInput';
import ExpenseRealPriceInput from './ExpenseRealPriceInput';

// TODO: Move data selection to reselect
const mapStateToProps = (state, ownProps) => {
  let categories = state.categories.expenses.find((category) => category.id === ownProps.categoryId);
  categories = (categories || { children: [] }).children;
  const yearlyBudget = state.budget[state.location.payload.year] || { expenses: {} };
  const data = yearlyBudget.expenses[state.location.payload.month] || {};
  const categoryIds = categories.map(category => category.id.toString());
  const { planned, real } = Object.keys(data).reduce((result, categoryId) => {
    if (categoryIds.indexOf(categoryId) > -1) {
      result.planned += data[categoryId].planned;
      result.real += data[categoryId].real;
    }

    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });

  return {
    categories,
    currency: state.configuration.currency.type,
    summaryPlanned: planned,
    summaryReal: real,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSubcategory: (name) => dispatch(CategoriesActions.addExpensesSubcategory(ownProps.categoryId, name)),
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

