import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';

class BudgetSummary extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  render() {
    const { className, planned, real } = this.props;
    return (
      <Table className={className} attached="bottom" singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>
              {this.translate('budget.summary.label', 'Podsumowanie')}
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.summary.planned', 'Planowane: {value} zł', { value: planned })}
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.summary.real', 'Rzeczywiste: {value} zł', { value: real })}
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{this.translate('budget.summary.to-use', 'Pozostało do dyspozycji')}</TableCell>
            <TableCell>0.00 zł</TableCell>
            <TableCell>0.00 zł</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

BudgetSummary.propTypes = {
  className: PropTypes.string,
  planned: PropTypes.number.isRequired,
  real: PropTypes.number.isRequired,
};

export default injectIntl(BudgetSummary);
