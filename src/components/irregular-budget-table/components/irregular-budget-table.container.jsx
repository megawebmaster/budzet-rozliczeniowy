import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BudgetTable } from '../../budget-table';
import { addCategory, irregularCategories } from '../../categories';
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

const IrregularBudgetTable = ({ category, currency, categories, summaryPlanned, summaryReal, className,
                                onInputMount }) => (
  <BudgetTable
    category={category}
    className={className}
    categories={categories}
    currency={currency}
    summaryPlanned={summaryPlanned}
    summaryReal={summaryReal}
    editableRealValues={false}
    manageableCategories={false}
    onInputMount={onInputMount}
    PlannedInput={IrregularPlannedPriceInput}
    RealInput={IrregularRealPriceInput}
  />
);

IrregularBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
IrregularBudgetTable.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
};

export default connect(mapStateToProps)(IrregularBudgetTable);

