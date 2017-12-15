import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableRow, TableHeaderCell } from 'semantic-ui-react';

import ExpensesGridRow from '../../containers/expenses/ExpensesGridRow';
import NewExpensesGridRow from '../../containers/expenses/NewExpensesGridRow';

const mapStateToProps = (state) => ({
  rows: (state.expenses[state.location.payload.year] || [])[state.location.payload.month] || [],
});

class ExpensesGrid extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { rows } = this.props;

    return (
      <Table singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>
              {this.translate('expenses-grid.headers.category', 'Category')}
            </TableHeaderCell>
            <TableHeaderCell width={2} textAlign="center">
              {this.translate('expenses-grid.headers.price', 'Price')}
            </TableHeaderCell>
            <TableHeaderCell width={1} textAlign="center">
              {this.translate('expenses-grid.headers.day', 'Day')}
            </TableHeaderCell>
            <TableHeaderCell width={8}>
              {this.translate('expenses-grid.headers.description', 'Description')}
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

ExpensesGrid.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(injectIntl(ExpensesGrid));
