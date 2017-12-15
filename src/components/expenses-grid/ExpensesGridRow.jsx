import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
// import { isNumber } from 'lodash';
import { TableRow, TableCell, Input, Dropdown, DropdownSearchInput, Button, Loader } from 'semantic-ui-react';

import './expenses-grid-row.css';


class ExpensesGridRow extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  onKeyPress = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.saveItem();
    }
  };

  saveItem = () => {
    const { year, month } = this.props;
    this.props.onSaveItem(this.state, year, month);
  };

  removeItem = () => {
    const { year, month } = this.props;
    this.props.onRemoveItem(this.state, year, month);
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
                    placeholder={this.translate('expenses-row.category', 'Wybierz kategorię')}
                    searchInput={<DropdownSearchInput inputRef={(input) => this.categoryField = input} />}  />
        </TableCell>
        <TableCell>
          <Input className="input-price" fluid label={{ basic: true, content: 'zł' }} labelPosition="right"
                 value={price} placeholder={this.translate('expenses-row.price', 'Cena')} onChange={this.updatePrice}
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

ExpensesGridRow.propTypes = {
  categories: PropTypes.array.isRequired,
  month: PropTypes.number.isRequired,
  onRemoveItem: PropTypes.func,
  onSaveItem: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
};

export default injectIntl(ExpensesGridRow);
