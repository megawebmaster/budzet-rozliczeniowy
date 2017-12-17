import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableFooter, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';

import PriceInput from '../price-input/PriceInput';
import AddCategoryButton from './AddCategoryButton';

class BudgetTable extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  currency = (value) => this.props.intl.formatNumber(value, { style: 'currency', currency: 'PLN' });

  render() {
    const { label, categories, data, editableRealValues, className, onAdd, onUpdatePlanned, onUpdateReal } = this.props;
    const categoryIds = categories.map(category => category.id.toString());
    const { planned, real } = Object.keys(data).reduce((result, categoryId) => {
      if (categoryIds.indexOf(categoryId) > -1) {
        result.planned += data[categoryId].planned;
        result.real += data[categoryId].real;
      }

      return result;
    }, {
      planned: 0.0,
      real: 0.0,
    });

    return (
      <Table className={className} singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>{label}</TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.table.header-planned', 'Planowane ({value})', { value: this.currency(planned) })}
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.table.header-real', 'Rzeczywiste ({value})', { value: this.currency(real) })}
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          { categories.map(category => {
            const values = data[category.id] || { planned: 0, real: 0 };
            return (
              <TableRow key={`budget-row-${category.id}`}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <PriceInput value={values.planned} onChange={(value) => onUpdatePlanned(category.id, value)} />
                </TableCell>
                <TableCell>
                  <PriceInput value={values.real} disabled={!editableRealValues}
                              onChange={(value) => onUpdateReal(category.id, value)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <AddCategoryButton label={this.translate('budget.table.add-subcategory', 'Dodaj podkategorię')}
                                 size="tiny" onAdd={onAdd} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

BudgetTable.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  editableRealValues: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdatePlanned: PropTypes.func.isRequired,
  onUpdateReal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default injectIntl(BudgetTable);

