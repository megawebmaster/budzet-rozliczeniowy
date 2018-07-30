import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableCell, TableFooter, TableRow } from 'semantic-ui-react';

import { BudgetTable } from '../../budget-table';
import IrregularPlannedPriceInput from './planned-price-input.container';
import IrregularRealPriceInput from './real-price-input.container';
import { currencyType } from '../../configuration';
import { plannedIrregularExpenses, realIrregularExpenses } from '../irregular-budget.selectors';
import { addCategory } from '../../categories';
import { AddCategoryButton } from '../../add-button';

const mapStateToProps = (state) => ({
  currency: currencyType(state),
  summaryPlanned: plannedIrregularExpenses(state),
  summaryReal: realIrregularExpenses(state),
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(addCategory('irregular', name)),
});

const IrregularBudgetTable = ({ category, currency, categories, summaryPlanned, summaryReal, className, addCategory,
                                onInputMount }) => (
  <BudgetTable
    category={category}
    className={className}
    categories={categories}
    editableRealValues={false}
    summaryPlanned={summaryPlanned}
    summaryReal={summaryReal}
    currency={currency}
    onInputMount={onInputMount}
    PlannedInput={IrregularPlannedPriceInput}
    RealInput={IrregularRealPriceInput}
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

IrregularBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
IrregularBudgetTable.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(IrregularBudgetTable);

