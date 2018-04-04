import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  Button,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderCell
} from 'semantic-ui-react';

import NavigableTable from '../../NavigableTable';
import { ExpensesRow } from '../../expenses-row';
import { ExpensesNewRow } from '../../expenses-new-row';

import './expenses.css';

class Expenses extends Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    sortRows: PropTypes.func.isRequired,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  sortCategory = () => this.props.sortRows('category');
  sortDay = () => this.props.sortRows('day');

  render() {
    const { rows, onInputMount, onFooterMount, onKeyDown, onFocus } = this.props;

    // TODO: There is an issue with going with arrows in category dropdown - we should leave it alone?
    return (
      <div onKeyDown={onKeyDown} onFocus={onFocus}>
        <div className="expenses-table-header">
          <Table singleLine striped compact className="expenses-table" attached="top">
            <TableHeader>
              <TableRow>
                <TableHeaderCell width={4}>
                  <Button basic fluid color="black" onClick={this.sortCategory} className="expense-header-category">
                    {this.translate('expenses-grid.headers.category', 'Kategoria')}
                  </Button>
                </TableHeaderCell>
                <TableHeaderCell width={2} textAlign="center">
                  {this.translate('expenses-grid.headers.price', 'Cena')}
                </TableHeaderCell>
                <TableHeaderCell width={1}>
                  <Button basic fluid color="black" onClick={this.sortDay}>
                    {this.translate('expenses-grid.headers.day', 'Dzień')}
                  </Button>
                </TableHeaderCell>
                <TableHeaderCell width={8}>
                  {this.translate('expenses-grid.headers.description', 'Opis')}
                </TableHeaderCell>
                <TableHeaderCell width={1} />
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        <Table singleLine striped compact className="expenses-table" attached>
          <TableBody>
            {rows.map(row => <ExpensesRow key={`expenses-row-${row.id}`} row={row} onInputMount={onInputMount} />)}
          </TableBody>
        </Table>
        <ExpensesNewRow onInputMount={onFooterMount} />
      </div>
    );
  }
}

const NavigableExpenses = NavigableTable(Expenses, {
  getItems: ({ rows }) => rows.map(row => row.id),
  topMargin: 60,
  bottomMargin: 60
});
export default injectIntl(NavigableExpenses);
