import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { TableRow, TableCell, Input, Dropdown, DropdownSearchInput, Button } from 'semantic-ui-react';

import PriceInput from '../price-input/PriceInput';
import './expenses-grid-row.css';

class NewExpensesGridRow extends Component {
  newRowState = {
    category: '',
    price: null,
    day: '',
    description: '',
  };

  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  addItem = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      const { onAddItem, month, year } = this.props;
      onAddItem(this.state, year, month);
      this.reset();
      this.categoryField.focus();
    }
  };

  updateCategory = (_event, data) => {
    this.setState({ category: data.value });
  };
  updatePrice = (value) => {
    this.setState({ price: value });
  };
  updateDay = (_event, data) => {
    this.setState({ day: data.value });
  };
  updateDescription = (_event, data) => {
    this.setState({ description: data.value });
  };

  reset = () => {
    this.setState({ ...this.newRowState, id: `new_${Date.now()}` });
  };

  componentWillMount() {
    this.reset();
  }

  render() {
    const { categories } = this.props;
    const { category, price, day, description } = this.state;

    // TODO: Add proper validations: price as double, day as available day
    // TODO: Move each cell to separate component - it will ease updating :)
    return (
      <TableRow className="expenses-row">
        <TableCell>
          <Dropdown fluid value={category} selection search options={categories} onChange={this.updateCategory}
                    openOnFocus={false} placeholder={this.format('expenses-row.category', 'Wybierz kategorię')}
                    searchInput={<DropdownSearchInput inputRef={(input) => this.categoryField = input} />}  />
        </TableCell>
        <TableCell>
          <PriceInput value={price} placeholder={this.format('expenses-row.price', 'Cena')} onChange={this.updatePrice}
                      onKeyPress={this.addItem} />
        </TableCell>
        <TableCell>
          <Input className="input-day" fluid value={day} onChange={this.updateDay} onKeyPress={this.addItem} />
        </TableCell>
        <TableCell>
          <Input fluid value={description} onChange={this.updateDescription} onKeyPress={this.addItem} />
        </TableCell>
        <TableCell textAlign="center">
          <Button color="green" icon="plus" tabIndex="-1" onClick={this.addItem} />
        </TableCell>
      </TableRow>
    );
  }
}

NewExpensesGridRow.propTypes = {
  categories: PropTypes.array.isRequired,
  month: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
};

export default injectIntl(NewExpensesGridRow);

