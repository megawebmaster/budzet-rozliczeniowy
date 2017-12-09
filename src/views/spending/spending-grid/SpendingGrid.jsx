import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableRow, TableHeaderCell } from 'semantic-ui-react';

import SpendingGridRow from './SpendingGridRow';
import NewSpendingGridRow from './NewSpendingGridRow';

const mapStateToProps = (state) => ({
  month: state.location.payload.month,
  rows: state.spending.rows[state.location.payload.month] || [],
});

class SpendingGrid extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { rows } = this.props;

    return (
      <Table singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>
              {this.format('spending-grid.headers.category', 'Category')}
            </TableHeaderCell>
            <TableHeaderCell width={2} textAlign="center">
              {this.format('spending-grid.headers.price', 'Price')}
            </TableHeaderCell>
            <TableHeaderCell width={1} textAlign="center">
              {this.format('spending-grid.headers.day', 'Day')}
            </TableHeaderCell>
            <TableHeaderCell width={8}>
              {this.format('spending-grid.headers.description', 'Description')}
            </TableHeaderCell>
            <TableHeaderCell width={1} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => <SpendingGridRow key={`spending-row-${row.id}`} row={row} />)}
          <NewSpendingGridRow />
        </TableBody>
      </Table>
    );
  }
}

export default connect(mapStateToProps)(injectIntl(SpendingGrid));
