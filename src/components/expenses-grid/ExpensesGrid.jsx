import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableRow, TableHeaderCell } from 'semantic-ui-react';

import ExpensesGridRow from '../../containers/expenses/ExpensesGridRow';
import NewExpensesGridRow from '../../containers/expenses/NewExpensesGridRow';

const NEW_ROW = 'new-expense-row';
const ENTER = 13;
const ARROW_UP = 38;
const ARROW_DOWN = 40;
// const ARROW_LEFT = 37;
// const ARROW_RIGHT = 39;

// TODO: Add ability to sort data (based on date)
const mapStateToProps = (state) => ({
  rows: (state.expenses[state.location.payload.year] || [])[state.location.payload.month] || [],
});

// TODO: Move navigation to NavigableTable
class ExpensesGrid extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    current: {
      index: -1,
      type: null,
    },
  };

  inputMount = (index, type, input) => {
    if (input === null || input.inputRef === null) {
      return;
    }
    input.inputRef.dataset.index = index;
    input.inputRef.dataset.type = type;
    this.inputs[type][index] = input.inputRef;
  };
  newInputMount = (type, input) => {
    if (input === null || input.inputRef === null) {
      return;
    }
    input.inputRef.dataset.index = NEW_ROW;
    input.inputRef.dataset.type = type;
    this.newInputs[type] = input.inputRef;
  };
  onKeyDown = (e) => {
    if ([ENTER, ARROW_UP, ARROW_DOWN].indexOf(e.keyCode) !== -1) {
      if ([ENTER, ARROW_DOWN].indexOf(e.keyCode) !== -1) {
        this.moveFocus(1);
      }
      if ([ARROW_UP].indexOf(e.keyCode) !== -1) {
        this.moveFocus(-1);
      }
    }
  };
  moveFocus = (delta) => {
    const { current } = this.state;
    const rows = Object.keys(this.inputs[current.type]).length;
    let next = current.index + delta;

    if (next < 0) {
      return;
    }
    if (next >= rows) {
      this.newInputs[current.type].focus();
      this.setState({ current: { ...current, index: NEW_ROW }});
      return;
    }
    if (current.index === NEW_ROW) {
      if (delta === 1) {
        return;
      }
      next = rows - 1;
    }

    this.inputs[current.type][next].focus();
    this.setState({ current: { ...current, index: next }});
  };
  onFocus = (e) => {
    const { current } = this.state;
    const data = e.target.dataset;

    if (current.index === NEW_ROW || data.index === NEW_ROW) {
      this.setState({ current: { index: NEW_ROW, type: data.type }});
      return;
    }

    const index = parseInt(data.index, 10);
    this.setState({ current: { index, type: data.type }});
  };

  componentWillMount() {
    this.inputs = {
      category: {},
      price: {},
      day: {},
      description: {},
    };
    this.newInputs = {};
  }

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
        <TableBody onKeyDown={this.onKeyDown} onFocus={this.onFocus}>
          {rows.map((row, index) => <ExpensesGridRow key={`expenses-row-${row.id}`} row={row}
                                                     onInputMount={this.inputMount.bind(this, index)} />)}
          <NewExpensesGridRow onInputMount={this.newInputMount} />
        </TableBody>
      </Table>
    );
  }
}

ExpensesGrid.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(injectIntl(ExpensesGrid));
