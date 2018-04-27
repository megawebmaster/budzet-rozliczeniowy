import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Input, TableRow, TableCell, Button, Loader } from 'semantic-ui-react';

import { PriceInput } from '../../price-input';
import { CategoryField } from './category-field';
import { DayField } from './day-field';

class ExpensesGridRow extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    row: PropTypes.shape({
      id: PropTypes.number.isRequired,
      saving: PropTypes.bool,
    }).isRequired,
    onInputMount: PropTypes.func,
    onRemoveItem: PropTypes.func,
    onSaveItem: PropTypes.func.isRequired,
  };
  static defaultProps = {
    onInputMount: (_type, _input) => {},
    onRemoveItem: (_state) => {},
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  saveItem = () => this.props.onSaveItem(this.state);
  removeItem = () => this.props.onRemoveItem(this.state);

  updateCategory = (_event, data) => this.setState({ category: data.value }, this.saveItem);
  updatePrice = (price) => this.setState({ price }, this.saveItem);
  updateDay = (day) => this.setState({ day }, this.saveItem);
  updateDescription = (_event, data) => this.setState({ description: data.value }, this.saveItem);

  state = {
    category: '',
    day: '',
    price: '',
    description: '',
  };

  componentDidMount() {
    this.setState(this.props.row);
  }

  render() {
    const { categories, row: { id, saving }, onInputMount } = this.props;
    const { category, day, price, description } = this.state;

    // TODO: Show data-saving errors
    return (
      <TableRow className="expenses-row">
        <TableCell width={4}>
          <CategoryField categories={categories} value={category} onUpdate={this.updateCategory}
                         onInputMount={(input) => onInputMount('category', id, input)} />
        </TableCell>
        <TableCell width={2}>
          <PriceInput value={price} placeholder={this.translate('expenses-row.price', 'Cena')}
                      onChange={this.updatePrice} onMount={onInputMount.bind(null, 'price', id)} />
        </TableCell>
        <TableCell width={1}>
          <DayField value={day} onInputMount={(input) => onInputMount('day', id, input)} onUpdate={this.updateDay} />
        </TableCell>
        <TableCell width={8}>
          <Input fluid value={description} onChange={this.updateDescription}
                 ref={onInputMount.bind(null, 'description', id)} />
        </TableCell>
        <TableCell width={1} textAlign="center">
          { saving ?
            <Loader active inline="centered" /> :
            <Button color="red" icon="trash" tabIndex="-1" onClick={this.removeItem} /> }
        </TableCell>
      </TableRow>
    );
  }
}

export default injectIntl(ExpensesGridRow);

