import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Button, Loader } from 'semantic-ui-react';

import { PriceInput } from '../../price-input';
import { CategoryField } from './category-field';
import { DayField } from './day-field';
import { DescriptionField } from './description-field';

export default class extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    debounceTime: PropTypes.number,
    intl: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    onInputMount: PropTypes.func,
    onRemoveItem: PropTypes.func,
    onSaveItem: PropTypes.func.isRequired,
    onUpdateField: PropTypes.func.isRequired,
  };
  static defaultProps = {
    debounceTime: 1000,
    onInputMount: (_type, _input) => {},
    onRemoveItem: null,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  removeItem = () => this.props.onRemoveItem();
  saveItem = () => this.props.onSaveItem();

  updateCategory = (category) => this.props.onUpdateField('category', category);
  updatePrice = (price) => this.props.onUpdateField('price', price);
  updateDay = (day) => this.props.onUpdateField('day', day);
  updateDescription = (description) => this.props.onUpdateField('description', description);

  mountCategory = (input) => this.props.onInputMount('category', this.props.row.id, input);
  mountPrice = (input) => this.props.onInputMount('price', this.props.row.id, input);
  mountDay = (input) => this.props.onInputMount('day', this.props.row.id, input);
  mountDescription = (input) => this.props.onInputMount('description', this.props.row.id, input);

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.props.onSaveItem();
    }
  };

  renderActions = () => {
    const { saving, errors } = this.props.row;

    if (saving) {
      return <Loader active inline="centered" />;
    }

    if (Object.keys(errors).length > 0) {
      return <Button color="green" icon="save" tabIndex="-1" onClick={this.saveItem} />;
    }

    if (this.props.onRemoveItem) {
      return <Button color="red" icon="trash" tabIndex="-1" onClick={this.removeItem} />;
    }

    return <Button color="green" icon="plus" tabIndex="-1" onClick={this.saveItem} />;
  };

  render() {
    const { categories, debounceTime, row: { category, day, price, description, errors } } = this.props;

    return (
      <TableRow className="expenses-row" warning={Object.keys(errors).length > 0} onKeyDown={this.onKeyDown}>
        <TableCell width={4}>
          <CategoryField categories={categories} value={category} error={errors.category} debounceTime={debounceTime}
                         onChange={this.updateCategory} onInputMount={this.mountCategory} />
        </TableCell>
        <TableCell width={3}>
          <PriceInput value={price} placeholder={this.translate('expenses-row.price', 'Cena')} error={errors.price}
                      debounceTime={debounceTime} onChange={this.updatePrice} onMount={this.mountPrice} />
        </TableCell>
        <TableCell width={1}>
          <DayField value={day} error={errors.day} debounceTime={debounceTime} onInputMount={this.mountDay}
                    onChange={this.updateDay} />
        </TableCell>
        <TableCell width={7}>
          <DescriptionField value={description} error={errors.description} errorPosition="left"
                            debounceTime={debounceTime} onChange={this.updateDescription}
                            onInputMount={this.mountDescription} />
        </TableCell>
        <TableCell width={1} textAlign="center">
          {this.renderActions()}
        </TableCell>
      </TableRow>
    );
  }
}
