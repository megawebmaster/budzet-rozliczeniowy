import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BudgetTable } from '../../budget-table';
import IrregularPlannedPriceInput from './planned-price-input.container';
import IrregularRealPriceInput from './real-price-input.container';
import { currencyType } from '../../configuration';
import { plannedIrregularExpenses, realIrregularExpenses } from '../irregular-budget.selectors';
import { addIrregularCategory } from '../../categories';

const mapStateToProps = (state) => ({
  currency: currencyType(state),
  summaryPlanned: plannedIrregularExpenses(state),
  summaryReal: realIrregularExpenses(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(addIrregularCategory(name)),
});

const IrregularBudgetTable = ({ label, currency, categories, summaryPlanned, summaryReal, className, addCategory,
                                onInputMount }) => (
  <BudgetTable className={className} label={label} categories={categories} editableRealValues={false}
               summaryPlanned={summaryPlanned} summaryReal={summaryReal} onAdd={addCategory} currency={currency}
               onInputMount={onInputMount} PlannedInput={IrregularPlannedPriceInput} RealInput={IrregularRealPriceInput} />
);

IrregularBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
IrregularBudgetTable.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IrregularBudgetTable);

