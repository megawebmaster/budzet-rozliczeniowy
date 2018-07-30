import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableCell, TableFooter, TableRow } from 'semantic-ui-react';

import { currencyType } from '../../configuration';
import { plannedIncome, realIncome } from '../income-budget-table.selectors';

import { addCategory } from '../../categories';
import { BudgetTable } from '../../budget-table';
import IncomePlannedPriceInput from './planned-price-input.container';
import IncomeRealPriceInput from './real-price-input.container';
import { AddCategoryButton } from '../../add-button';

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
  <BudgetTable
    category={category}
    className={className}
    categories={categories}
    summaryPlanned={summaryPlanned}
    summaryReal={summaryReal}
    currency={currency}
    onInputMount={onInputMount}
    editableRealValues={true}
    PlannedInput={IncomePlannedPriceInput}
    RealInput={IncomeRealPriceInput}
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

