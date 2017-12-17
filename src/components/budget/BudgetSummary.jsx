import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';

class BudgetSummary extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  currency = (value) => this.props.intl.formatNumber(value, { style: 'currency', currency: 'PLN' });

  render() {
    const { className, expenses, leftToUse } = this.props;
    return (
      <Table className={className} attached="bottom" singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>
              {this.translate('budget.summary.label', 'Podsumowanie')}
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.summary.planned', 'Planowane: {value}', { value: this.currency(expenses.planned) })}
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.summary.real', 'Rzeczywiste: {value}', { value: this.currency(expenses.real) })}
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{this.translate('budget.summary.to-use', 'Pozostało do dyspozycji')}</TableCell>
            <TableCell>
              {this.format('budget.summary.left-planned', '{value}', { value: this.currency(leftToUse.planned) })}
            </TableCell>
            <TableCell>
              {this.format('budget.summary.left-real', '{value}', { value: this.currency(leftToUse.real) })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

const expenseShape = PropTypes.shape({
  planned: PropTypes.number.isRequired,
  real: PropTypes.number.isRequired,
});

BudgetSummary.propTypes = {
  className: PropTypes.string,
  expenses: expenseShape.isRequired,
  leftToUse: expenseShape.isRequired,
};

export default injectIntl(BudgetSummary);
