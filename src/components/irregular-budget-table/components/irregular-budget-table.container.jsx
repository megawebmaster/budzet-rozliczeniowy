import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BudgetTable } from '../../budget-table';
import { addIrregularCategory, irregularCategories } from '../../categories';
import { plannedIrregular, realIrregular } from '../irregular-budget-table.selectors';
import { currencyType } from '../../configuration';

import IrregularPlannedPriceInput from './planned-price-input.container';
import IrregularRealPriceInput from './real-price-input.container';

const mapStateToProps = (state) => ({
  categories: irregularCategories(state),
  currency: currencyType(state),
  summaryPlanned: plannedIrregular(state),
  summaryReal: realIrregular(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(addIrregularCategory(name)),
});

const IrregularBudgetTable = ({ label, currency, categories, summaryPlanned, summaryReal, className, addCategory,
                                onInputMount }) => (
  <BudgetTable className={className} label={label} categories={categories} currency={currency}
               summaryPlanned={summaryPlanned} summaryReal={summaryReal} editableRealValues={false}
               manageableCategories={false} onAdd={addCategory} onInputMount={onInputMount}
               PlannedInput={IrregularPlannedPriceInput} RealInput={IrregularRealPriceInput} />
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

