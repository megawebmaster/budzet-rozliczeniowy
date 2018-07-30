import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { TableCell, TableFooter, TableRow } from 'semantic-ui-react';

import { BudgetTable } from '../../budget-table';
import { irregularCategories } from '../../categories';
import { plannedIrregular, realIrregular } from '../irregular-budget-table.selectors';
import { currencyType } from '../../configuration';

import IrregularPlannedPriceInput from './planned-price-input.container';
import IrregularRealPriceInput from './real-price-input.container';
import { SimplePriceInput } from '../../price-input';

const mapStateToProps = (state) => ({
  categories: irregularCategories(state),
  currency: currencyType(state),
  summaryPlanned: plannedIrregular(state),
  summaryReal: realIrregular(state),
});

const IrregularBudgetTable = ({
                                intl, category, currency, categories, summaryPlanned, summaryReal, className,
                                onInputMount
                              }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });
  const value = summaryPlanned - summaryReal;

  return (
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
    >
      <TableFooter>
        <TableRow>
          <TableCell>
            <p style={{ fontWeight: 'bold' }}>
              {value >= 0
                ? translate('budget.irregular-table.add-to-account', 'Dodaj do konta nieregularnych:')
                : translate('budget.irregular-table.remove-from-account', 'Odejmij z konta nieregularnych:')}
            </p>
          </TableCell>
          <TableCell colSpan={2}>
            <SimplePriceInput value={value} disabled={true} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </BudgetTable>
  );
};

IrregularBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {
  },
};
IrregularBudgetTable.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
};

export default connect(mapStateToProps)(injectIntl(IrregularBudgetTable));

