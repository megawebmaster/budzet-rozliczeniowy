import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableRow, TableHeaderCell } from 'semantic-ui-react';

import ExpensesGridRow from './ExpensesGridRow';
import NewExpensesGridRow from './NewExpensesGridRow';

const mapStateToProps = (state) => ({
  month: state.location.payload.month,
  rows: (state.expenses[state.location.payload.year] || [])[state.location.payload.month] || [],
});

class ExpensesGrid extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { rows } = this.props;

    return (
      <Table singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>
              {this.format('expenses-grid.headers.category', 'Category')}
            </TableHeaderCell>
            <TableHeaderCell width={2} textAlign="center">
              {this.format('expenses-grid.headers.price', 'Price')}
            </TableHeaderCell>
            <TableHeaderCell width={1} textAlign="center">
              {this.format('expenses-grid.headers.day', 'Day')}
            </TableHeaderCell>
            <TableHeaderCell width={8}>
              {this.format('expenses-grid.headers.description', 'Description')}
            </TableHeaderCell>
            <TableHeaderCell width={1} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => <ExpensesGridRow key={`expenses-row-${row.id}`} row={row} />)}
          <NewExpensesGridRow />
        </TableBody>
      </Table>
    );
  }
}

export default connect(mapStateToProps)(injectIntl(ExpensesGrid));
