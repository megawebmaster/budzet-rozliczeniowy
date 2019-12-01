import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableCell, TableFooter, TableRow } from 'semantic-ui-react';

import { currencyType } from '../../configuration';
import { plannedSavings, realSavings } from '../savings-budget-table.selectors';

import { addCategory } from '../../categories';
import { BudgetTable } from '../../budget-table';
import SavingsPlannedPriceInput from './planned-price-input.container';
import SavingsRealPriceInput from './real-price-input.container';
import { AddCategoryButton } from '../../add-button';

const mapStateToProps = (state) => ({
  currency: currencyType(state),
  summaryPlanned: plannedSavings(state),
  summaryReal: realSavings(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(addCategory('saving', name)),
});

const SavingsBudgetTable = ({ category, categories, currency, summaryPlanned, summaryReal, className, addCategory,
                             onInputMount }) => (
  <BudgetTable
    category={category}
    className={className}
    categories={categories}
    summaryPlanned={summaryPlanned}
    summaryReal={summaryReal}
    currency={currency}
    onInputMount={onInputMount}
    editableRealValues={true}
    PlannedInput={SavingsPlannedPriceInput}
    RealInput={SavingsRealPriceInput}
  >
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>
          <AddCategoryButton onSave={addCategory} disabled={category.saving || category.error.length > 0} size="tiny" />
        </TableCell>
      </TableRow>
    </TableFooter>
  </BudgetTable>
);

SavingsBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
SavingsBudgetTable.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavingsBudgetTable);

