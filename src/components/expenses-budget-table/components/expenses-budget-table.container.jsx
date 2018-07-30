import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableCell, TableFooter, TableRow } from 'semantic-ui-react';

import { BudgetTable } from '../../budget-table';
import { addCategory, removeCategory, updateCategory } from '../../categories';
import { currencyType } from '../../configuration';

import {
  expensesTableCategories,
  expensesTablePlannedSummary,
  expensesTableRealSummary
} from '../expenses-budget-table.selectors';
import ExpensePlannedPriceInput from './planned-price-input.container';
import ExpenseRealPriceInput from './real-price-input.container';
import { AddSubcategoryButton } from '../../add-button';

const mapStateToProps = (state, ownProps) => ({
  categories: expensesTableCategories(state, ownProps),
  currency: currencyType(state),
  summaryPlanned: expensesTablePlannedSummary(state, ownProps),
  summaryReal: expensesTableRealSummary(state, ownProps),
});

const mapDispatchToProps = (dispatch, { category }) => ({
  addSubcategory: (name) => dispatch(addCategory('expense', name, category.id)),
  onRemove: () => dispatch(removeCategory('expense', category)),
  onEdit: (name) => dispatch(updateCategory('expense', category, { name })),
});

const ExpensesBudgetTable = ({
                               category, currency, categories, summaryPlanned, summaryReal, className,
                               addSubcategory, onEdit, onRemove, onInputMount
                             }) => (
  <BudgetTable
    category={category}
    className={className}
    categories={categories}
    editableRealValues={false}
    summaryPlanned={summaryPlanned}
    summaryReal={summaryReal}
    currency={currency}
    onInputMount={onInputMount}
    PlannedInput={ExpensePlannedPriceInput}
    RealInput={ExpenseRealPriceInput}
    onRemove={onRemove}
    onEdit={onEdit}
  >
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>
          <AddSubcategoryButton onSave={addSubcategory} disabled={category.saving || category.error.length > 0} />
        </TableCell>
      </TableRow>
    </TableFooter>
  </BudgetTable>
);

ExpensesBudgetTable.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object.isRequired,
  onInputMount: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesBudgetTable);

