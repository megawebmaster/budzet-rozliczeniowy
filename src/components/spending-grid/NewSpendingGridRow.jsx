import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { TableRow, TableCell, Input, Dropdown, DropdownSearchInput, Button } from 'semantic-ui-react';

import * as SpendingActions from '../../stores/spending/SpendingAction';
import './spending-grid-row.css';

const mapStateToProps = (state) => ({
  month: state.location.payload.month,
  categories: state.spending.categories,
});

const mapDispatchToProps = dispatch => ({
  addItem: (row, month) => dispatch(SpendingActions.addItem(row, month)),
});

class NewSpendingGridRow extends Component {
  newRowState = {
    category: '',
    price: '',
    day: '',
    description: '',
  };

  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  addItem = (event) => {
    if (event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.props.addItem(this.state, this.props.month);
      this.reset();
      this.categoryField.focus();
    }
  };

  // formatPrice = (value) => isNumber(value) ? (Math.round(value * 100) / 100).toFixed(2) : '';

  updateCategory = (_event, data) => {
    this.setState({ category: data.value });
  };
  updatePrice = (_event, data) => {
    this.setState({ price: data.value });
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
      <TableRow className="spending-row">
        <TableCell>
          <Dropdown fluid value={category} selection search options={categories} onChange={this.updateCategory}
                    openOnFocus={false} placeholder={this.format('spending-row.category', 'Wybierz kategorię')}
                    searchInput={<DropdownSearchInput inputRef={(input) => this.categoryField = input} />}  />
        </TableCell>
        <TableCell>
          <Input className="input-price" fluid label={{ basic: true, content: 'zł' }} labelPosition="right"
                 value={price} placeholder={this.format('spending-row.price', 'Cena')} onChange={this.updatePrice}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NewSpendingGridRow));

