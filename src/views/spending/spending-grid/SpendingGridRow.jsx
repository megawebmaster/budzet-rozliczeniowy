import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import { isNumber } from 'lodash';
import { TableRow, TableCell, Input, Dropdown, Button } from 'semantic-ui-react';
import './spending-grid-row.css';

const mapStateToProps = state => ({
  categories: state.spending.categories,
});

class SpendingGridRow extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  renderCategory = ({ input: { value, onChange }, placeholder }) => {
    const { categories } = this.props;
    return (
      <Dropdown fluid defaultValue={value} onChange={onChange} placeholder={placeholder} selection search
                options={categories} />
    );
  };

  renderField = ({ input: { value, onChange }, placeholder}) => (
    <Input fluid defaultValue={value} onChange={onChange} placeholder={placeholder} />
  );

  renderPrice = ({ input: { value, onChange }, placeholder }) => (
    <Input fluid label={{ basic: true, content: 'zł' }} labelPosition="right" defaultValue={value} onChange={onChange}
           placeholder={placeholder} />
  );

  formatPrice = (value) => isNumber(value) ? parseFloat(Math.round(value * 100) / 100).toFixed(2) : '';

  render() {
    const { row } = this.props;

    // TODO: Add proper validations: price as double, day as available day
    return (
      <TableRow className="spending-row">
        <TableCell>
          <Field name={`${row}.category`} component={this.renderCategory}
                 placeholder={this.format('spending-row.category', 'Wybierz kategorię')} />
        </TableCell>
        <TableCell>
          <Field name={`${row}.price`} format={this.formatPrice} className="input-price" component={this.renderPrice}
                 placeholder={this.format('spending-row.price', 'Cena')} />
        </TableCell>
        <TableCell>
          <Field name={`${row}.day`} component={this.renderField} className="input-day" />
        </TableCell>
        <TableCell>
          <Field name={`${row}.description`} component={this.renderField} />
        </TableCell>
        <TableCell>
          <Button color="red" icon="trash" tabIndex="-1" />
        </TableCell>
      </TableRow>
    );
  }
}

export default connect(mapStateToProps)(injectIntl(SpendingGridRow));

