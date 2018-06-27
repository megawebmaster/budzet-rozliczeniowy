import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Loader, TableCell, TableRow } from 'semantic-ui-react';

import { PriceInput } from '../../price-input';
import { CategoryField } from './category-field';
import { DayField } from './day-field';
import { DescriptionField } from './description-field';
import { ErrorRow } from './error-row';

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
      this.setState({}, this.props.onSaveItem);
    }
  };

  renderActions = () => {
    const { saved, saving, errors, encryptedPrice, encryptedDescription } = this.props.row;

    if (saving || encryptedPrice || encryptedDescription) {
      return <Loader active inline="centered" />;
    }

    if (!saved && Object.keys(errors).length > 0) {
      if (this.props.onRemoveItem) {
        return <ButtonGroup>
          <Button color="green" icon="save" tabIndex="-1" onClick={this.saveItem} />
          <Button color="red" icon="trash" tabIndex="-1" onClick={this.removeItem} />
        </ButtonGroup>;
      }

      return <Button color="green" icon="save" tabIndex="-1" onClick={this.saveItem} />;
    }

    if (this.props.onRemoveItem) {
      return <Button color="red" icon="trash" tabIndex="-1" onClick={this.removeItem} />;
    }

    return <Button color="green" icon="plus" tabIndex="-1" onClick={this.saveItem} />;
  };

  render() {
    const { categories, debounceTime, row } = this.props;

    if (categories.length === 0) {
      return null;
    }

    return (
      <Fragment>
        <TableRow className="expenses-row" warning={Object.keys(row.errors).length > 0} onKeyDown={this.onKeyDown}>
          <TableCell width={4}>
            <CategoryField categories={categories} value={row.category} row={row} error={row.errors.category}
                           debounceTime={debounceTime} onChange={this.updateCategory} onInputMount={this.mountCategory}
                           disabled={row.saving} />
          </TableCell>
          <TableCell width={3}>
            <PriceInput value={row.price} placeholder={this.translate('expenses-row.price', 'Cena')} row={row}
                        error={row.errors.price} debounceTime={debounceTime} disabled={row.saving}
                        decrypted={!row.encryptedPrice} onChange={this.updatePrice} onMount={this.mountPrice} />
          </TableCell>
          <TableCell width={1}>
            <DayField value={row.day} row={row} error={row.errors.day} debounceTime={debounceTime} disabled={row.saving}
                      onChange={this.updateDay} onInputMount={this.mountDay} />
          </TableCell>
          <TableCell width={7}>
            <DescriptionField value={row.description} row={row} error={row.errors.description} errorPosition="left"
                              debounceTime={debounceTime} disabled={row.saving || Boolean(row.encryptedDescription)}
                              onChange={this.updateDescription} onInputMount={this.mountDescription} />
          </TableCell>
          <TableCell width={1} textAlign="center">
            {this.renderActions()}
          </TableCell>
        </TableRow>
        {row.errors.base ? <ErrorRow error={row.errors.base} /> : null}
      </Fragment>
    );
  }
}
