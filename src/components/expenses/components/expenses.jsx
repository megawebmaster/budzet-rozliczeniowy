import React, { Component, Fragment } from 'react';
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

import { ExpensesRow } from '../../expenses-row';
import { ExpensesNewRow } from '../../expenses-new-row';

import './expenses.css';

const NEW_ROW = 'new-expense-row';
const ENTER = 13;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

// TODO: Move navigation to NavigableTable - maybe special case footer would work?
class Expenses extends Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    sortRows: PropTypes.func.isRequired,
  };

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

  sortCategory = () => this.props.sortRows('category');
  sortDay = () => this.props.sortRows('day');

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
      <Fragment>
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
          <TableBody onKeyDown={this.onKeyDown} onFocus={this.onFocus}>
            {rows.map((row, index) => <ExpensesRow key={`expenses-row-${row.id}`} row={row}
                                                   onInputMount={this.inputMount.bind(this, index)} />)}
          </TableBody>
        </Table>
        <ExpensesNewRow onInputMount={this.newInputMount} />
      </Fragment>
    );
  }
}

export default injectIntl(Expenses);
