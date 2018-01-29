import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { TableRow, TableCell, Input, Button } from 'semantic-ui-react';

import { PriceInput } from '../../price-input';
import { DayField, CategoryField } from '../../expenses-row';

class NewExpensesRow extends Component {
  newRowState = {
    category: '',
    price: '',
    day: '',
    description: '',
  };

  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  addItem = (event) => {
    if (event.keyCode === 13) {
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
  updatePrice = (price) => {
    this.setState({ price });
  };
  updateDay = (day) => {
    this.setState({ day });
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
    const { categories, onInputMount } = this.props;
    const { category, price, day, description } = this.state;

    // TODO: Move each cell to separate component - it will ease updating :)
    // TODO: Show data-saving errors
    return (
      <TableRow className="expenses-row">
        <TableCell>
          <CategoryField categories={categories} value={category} onUpdate={this.updateCategory}
                         onInputMount={(input) => {
                           onInputMount('category', input);
                           this.categoryField = input.inputRef;
                         }} />
        </TableCell>
        <TableCell>
          <PriceInput value={price} placeholder={this.format('expenses-row.price', 'Cena')} onChange={this.updatePrice}
                      onKeyDown={this.addItem} onMount={onInputMount.bind(null, 'price')} />
        </TableCell>
        <TableCell>
          <DayField value={day} onInputMount={(input) => onInputMount('day', input)} onUpdate={this.updateDay}
                    onKeyDown={this.addItem} />
        </TableCell>
        <TableCell>
          <Input fluid value={description} onChange={this.updateDescription} onKeyDown={this.addItem}
                 ref={(input) => onInputMount('description', input)} />
        </TableCell>
        <TableCell textAlign="center">
          <Button color="green" icon="plus" tabIndex="-1" onClick={this.addItem} />
        </TableCell>
      </TableRow>
    );
  }
}

NewExpensesRow.defaultProps = {
  onInputMount: (_type, _input) => {},
};
NewExpensesRow.propTypes = {
  categories: PropTypes.array.isRequired,
  month: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onInputMount: PropTypes.func,
  year: PropTypes.number.isRequired,
};

export default injectIntl(NewExpensesRow);

