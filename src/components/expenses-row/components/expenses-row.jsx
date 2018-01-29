import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Input, TableRow, TableCell, Button, Loader } from 'semantic-ui-react';

import { PriceInput } from '../../price-input';
import { CategoryField } from './category-field';
import { DayField } from './day-field';

class ExpensesGridRow extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  saveItem = () => {
    const { year, month } = this.props;
    this.props.onSaveItem(this.state, year, month);
  };

  removeItem = () => {
    const { year, month } = this.props;
    this.props.onRemoveItem(this.state, year, month);
  };

  updateCategory = (_event, data) => {
    this.setState({ category: data.value }, this.saveItem);
  };
  updatePrice = (price) => {
    this.setState({ price }, this.saveItem);
  };
  updateDay = (day) => {
    this.setState({ day }, this.saveItem);
  };
  updateDescription = (_event, data) => {
    this.setState({ description: data.value }, this.saveItem);
  };

  componentWillMount() {
    this.setState(this.props.row);
  }

  render() {
    const { categories, row: { saving }, onInputMount } = this.props;
    const { category, day, price, description } = this.state;

    // TODO: Show data-saving errors
    return (
      <TableRow className="expenses-row">
        <TableCell>
          <CategoryField categories={categories} value={category} onUpdate={this.updateCategory}
                         onInputMount={(input) => onInputMount('category', input)} />
        </TableCell>
        <TableCell>
          <PriceInput value={price} placeholder={this.translate('expenses-row.price', 'Cena')}
                      onChange={this.updatePrice} onMount={onInputMount.bind(null, 'price')} />
        </TableCell>
        <TableCell>
          <DayField value={day} onInputMount={(input) => onInputMount('day', input)} onUpdate={this.updateDay} />
        </TableCell>
        <TableCell>
          <Input fluid value={description} onChange={this.updateDescription}
                 ref={onInputMount.bind(null, 'description')} />
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

ExpensesGridRow.defaultProps = {
  onInputMount: (_type, _input) => {},
  onRemoveItem: (_state, _year, _month) => {},
};
ExpensesGridRow.propTypes = {
  categories: PropTypes.array.isRequired,
  month: PropTypes.number.isRequired,
  onInputMount: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onSaveItem: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
};

export default injectIntl(ExpensesGridRow);

