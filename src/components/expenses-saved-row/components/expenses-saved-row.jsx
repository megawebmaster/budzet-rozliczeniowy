import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ExpensesRow } from '../../expenses-row';

export default class ExpensesSavedRow extends Component {
  static propTypes = {
    onSaveItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onInputMount: PropTypes.func,
  };

  static defaultProps = {
    onInputMount: (_type, _input) => {},
  };

  state = {
    category: '',
    price: '',
    day: new Date().getDate(),
    description: '',
    errors: {},
  };

  removeItem = () => this.props.onRemoveItem(this.state);
  saveItem = () => this.props.onSaveItem(this.state);
  updateField = (field, value) => value !== undefined && this.setState({
    [field]: value,
    errors: Object.keys(this.state.errors)
      .filter(key => key !== field)
      .reduce((errors, key) => {
        errors[key] = this.state.errors[key];
        return errors;
      }, {})
  }, this.saveItem);

  componentDidMount() {
    this.setState(this.props.row);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.row);
  }

  render() {
    const { onInputMount } = this.props;

    return (
      <ExpensesRow row={this.state} onInputMount={onInputMount} onSaveItem={this.saveItem}
                   onRemoveItem={this.removeItem} onUpdateField={this.updateField} />
    );
  }
}
