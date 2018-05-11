import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { currencyType } from '../../configuration';
import { plannedIncome, realIncome } from '../income-budget-table.selectors';

import { addCategory } from '../../categories';
import { BudgetTable } from '../../budget-table';
import IncomePlannedPriceInput from './planned-price-input.container';
import IncomeRealPriceInput from './real-price-input.container';

const mapStateToProps = (state) => ({
  currency: currencyType(state),
  summaryPlanned: plannedIncome(state),
  summaryReal: realIncome(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(addCategory('income', name)),
});

const IncomeBudgetTable = ({ category, categories, currency, summaryPlanned, summaryReal, className, addCategory,
                             onInputMount }) => (
  <BudgetTable category={category} className={className} categories={categories} summaryPlanned={summaryPlanned}
               summaryReal={summaryReal} currency={currency} onAdd={addCategory} onInputMount={onInputMount}
               editableRealValues={true} PlannedInput={IncomePlannedPriceInput} RealInput={IncomeRealPriceInput} />
);

IncomeBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
IncomeBudgetTable.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeBudgetTable);

