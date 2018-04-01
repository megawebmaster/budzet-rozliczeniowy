import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';

import SummaryPlannedValueLeft from './planned-value-left.container';
import SummaryRealValueLeft from './real-value-left.container';
import './budget-summary.css';

class BudgetSummary extends Component {
  static propTypes = {
    className: PropTypes.string,
    planned: PropTypes.number.isRequired,
    real: PropTypes.number.isRequired,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  currency = (value) => this.props.intl.formatNumber(value, { style: 'currency', currency: 'PLN' });

  render() {
    const { className, planned, real } = this.props;
    return (
      <div className="budget-summary">
        <Table className={className} singleLine striped compact>
          <TableHeader>
            <TableRow>
              <TableHeaderCell width={4}>
                {this.translate('budget.summary.label', 'Podsumowanie')}
              </TableHeaderCell>
              <TableHeaderCell width={4}>
                {this.format('budget.summary.planned', 'Planowane: {value}', { value: this.currency(planned) })}
              </TableHeaderCell>
              <TableHeaderCell width={4}>
                {this.format('budget.summary.real', 'Rzeczywiste: {value}', { value: this.currency(real) })}
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{this.translate('budget.summary.to-use', 'Pozostało do dyspozycji')}</TableCell>
              <TableCell>
                <SummaryPlannedValueLeft />
              </TableCell>
              <TableCell>
                <SummaryRealValueLeft />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table></div>
    );
  }
}

export default injectIntl(BudgetSummary);
