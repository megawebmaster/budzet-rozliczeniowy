import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';
import IncomePlannedPriceInput from './IncomePlannedPriceInput';
import IncomeRealPriceInput from './IncomeRealPriceInput';

const mapStateToProps = (state) => {
  const categories = state.categories.income;
  const yearlyBudget = state.budget[state.location.payload.year] || { income: {} };
  const data = yearlyBudget.income[state.location.payload.month] || {};
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
    summaryPlanned: planned,
    summaryReal: real,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(CategoriesActions.addIncomeCategory(name)),
});

const IncomeBudgetTable = ({ label, categories, summaryPlanned, summaryReal, className, addCategory, onInputMount }) => (
  <BudgetTable className={className} label={label} categories={categories} editableRealValues={true}
               summaryPlanned={summaryPlanned} summaryReal={summaryReal} onAdd={addCategory}
               onInputMount={onInputMount} PlannedInput={IncomePlannedPriceInput} RealInput={IncomeRealPriceInput} />
);

IncomeBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
IncomeBudgetTable.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeBudgetTable);

