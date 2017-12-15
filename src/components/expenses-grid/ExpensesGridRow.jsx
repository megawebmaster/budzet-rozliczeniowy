import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
// import { isNumber } from 'lodash';
import { TableRow, TableCell, Input, Dropdown, DropdownSearchInput, Button, Loader } from 'semantic-ui-react';

import * as ExpensesActions from '../../stores/expenses/ExpensesAction';
import './expenses-grid-row.css';

const mapStateToProps = (state) => {
  const categories = [];
  state.categories.expenses.forEach(category => {
    category.children.forEach(subcategory => {
      categories.push({ text: `${category.name} - ${subcategory.name}`, value: subcategory.id });
    })
  });

  return ({
    year: state.location.payload.year,
    month: state.location.payload.month,
    categories,
  });
};

const mapDispatchToProps = dispatch => ({
  saveItem: (row, year, month) => dispatch(ExpensesActions.saveItem(row, year, month)),
  removeItem: (row, year, month) => dispatch(ExpensesActions.removeItem(row, year, month)),
});

class ExpensesGridRow extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  onKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.saveItem();
    }
  };

  saveItem = () => {
    this.props.saveItem(this.state, this.props.month);
  };

  removeItem = () => {
    this.props.removeItem(this.state, this.props.month);
  };

  // formatPrice = (value) => isNumber(value) ? (Math.round(value * 100) / 100).toFixed(2) : '';

  updateCategory = (_event, data) => {
    this.setState({ category: data.value });
    this.saveItem();
  };
  updatePrice = (_event, data) => {
    this.setState({ price: data.value });
    this.saveItem();
  };
  updateDay = (_event, data) => {
    this.setState({ day: data.value });
    this.saveItem();
  };
  updateDescription = (_event, data) => {
    this.setState({ description: data.value });
    this.saveItem();
  };

  componentWillMount() {
    this.setState(this.props.row);
  }

  render() {
    const { categories, row: { saving } } = this.props;
    const { category, price, day, description } = this.state;

    // TODO: Add proper validations: price as double, day as available day
    return (
      <TableRow className="expenses-row">
        <TableCell>
          <Dropdown fluid value={category} selection search options={categories} onChange={this.updateCategory}
                    placeholder={this.format('expenses-row.category', 'Wybierz kategorię')}
                    searchInput={<DropdownSearchInput inputRef={(input) => this.categoryField = input} />}  />
        </TableCell>
        <TableCell>
          <Input className="input-price" fluid label={{ basic: true, content: 'zł' }} labelPosition="right"
                 value={price} placeholder={this.format('expenses-row.price', 'Cena')} onChange={this.updatePrice}
                 onKeyPress={this.onKeyPress} />
        </TableCell>
        <TableCell>
          <Input className="input-day" fluid value={day} onChange={this.updateDay} onKeyPress={this.onKeyPress} />
        </TableCell>
        <TableCell>
          <Input fluid value={description} onChange={this.updateDescription} onKeyPress={this.onKeyPress} />
        </TableCell>
        <TableCell textAlign="center">
          { saving ?
            <Loader active inline="centered" /> :
            <Button color="red" icon="trash" tabIndex="-1" onClick={this.removeItem} /> }
        </TableCell>
      </TableRow>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExpensesGridRow));

