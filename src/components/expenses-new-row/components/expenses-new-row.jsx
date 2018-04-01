import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, Input, Table, TableBody, TableHeaderCell, TableRow } from 'semantic-ui-react';

import { PriceInput } from '../../price-input';
import { CategoryField, DayField } from '../../expenses-row';
import './expenses-new-row.css';

const newRowState = {
  category: '',
  price: '',
  day: '',
  description: '',
};

class NewExpensesRow extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    month: PropTypes.number.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onInputMount: PropTypes.func,
    year: PropTypes.number.isRequired,
  };

  static defaultProps = {
    onInputMount: (_type, _input) => {},
  };

  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.addItem();
    }
  };

  addItem = () => {
    const { onAddItem, month, year } = this.props;
    onAddItem(this.state, year, month);
    this.reset();
    this.categoryField.focus();
    setTimeout(() => window.scrollBy({ top: document.body.offsetHeight, left: 0, behavior: 'smooth' }));
  };

  updateCategory = (_event, data) => this.setState({ category: data.value });
  updatePrice = (price) => this.setState({ price });
  updateDay = (day) => this.setState({ day });
  updateDescription = (_event, data) => this.setState({ description: data.value });
  reset = () => this.setState({ ...newRowState, id: `new_${Date.now()}` });

  componentWillMount() {
    this.reset();
  }

  render() {
    const { categories, onInputMount } = this.props;
    const { category, price, day, description } = this.state;

    // TODO: Show data-saving errors
    return (
      <div className="expenses-new-row">
        <Table singleLine compact basic="very" sortable attached="bottom">
          <TableBody>
            <TableRow className="expenses-row">
              <TableHeaderCell width={4}>
                <CategoryField categories={categories} value={category} onUpdate={this.updateCategory}
                               onInputMount={(input) => {
                                 onInputMount('category', input);
                                 this.categoryField = input.inputRef;
                               }} />
              </TableHeaderCell>
              <TableHeaderCell width={2}>
                <PriceInput value={price} placeholder={this.format('expenses-row.price', 'Cena')}
                            onChange={this.updatePrice}
                            onKeyDown={this.onKeyDown} onMount={onInputMount.bind(null, 'price')} />
              </TableHeaderCell>
              <TableHeaderCell width={1}>
                <DayField value={day} onInputMount={(input) => onInputMount('day', input)} onUpdate={this.updateDay}
                          onKeyDown={this.onKeyDown} />
              </TableHeaderCell>
              <TableHeaderCell width={8}>
                <Input fluid value={description} onChange={this.updateDescription} onKeyDown={this.onKeyDown}
                       ref={(input) => onInputMount('description', input)} />
              </TableHeaderCell>
              <TableHeaderCell width={1} textAlign="center">
                <Button color="green" icon="plus" tabIndex="-1" onClick={this.addItem} />
              </TableHeaderCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default injectIntl(NewExpensesRow);

