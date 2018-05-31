import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody } from 'semantic-ui-react';
import { ExpensesRow } from '../../expenses-row';
import './expenses-new-row.css';

const newRowState = {
  category: '',
  price: '',
  day: '',
  description: '',
  errors: {},
};

export default class extends Component {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
    onInputMount: PropTypes.func,
  };

  static defaultProps = {
    onInputMount: (_type, _item, _input) => {},
  };

  state = { ...newRowState, id: Date.now() };

  addItem = () => {
    this.props.onAddItem(this.state);
    this.reset();
    this.categoryField.focus();
  };

  mountInput = (type, item, input) => {
    if (type === 'category') {
      this.categoryField = input.inputRef;
    }
    this.props.onInputMount(type, item, input);
  };
  updateField = (field, value) => value !== undefined && this.setState({ [field]: value });
  reset = () => this.setState({ ...newRowState, id: Date.now() });

  render() {
    return (
      <div className="expenses-new-row">
        <Table singleLine compact basic="very" sortable attached>
          <TableBody>
            <ExpensesRow row={this.state} onInputMount={this.mountInput} onSaveItem={this.addItem} debounceTime={0}
                         onUpdateField={this.updateField} />
          </TableBody>
        </Table>
      </div>
    );
  }
}
