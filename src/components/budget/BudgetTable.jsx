import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableFooter, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';

import AddCategoryButton from './AddCategoryButton';

class BudgetTable extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  currency = (value) => this.props.intl.formatNumber(value, { style: 'currency', currency: 'PLN' });

  render() {
    const { label, categories, data, editableRealValues, className, onAdd, PlannedInput, RealInput } = this.props;
    const categoryIds = categories.map(category => category.id.toString());
    // TODO: Extract into data source!
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
          { categories.map(category => (
              <TableRow key={`budget-row-${category.id}`}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <PlannedInput category={category} />
                </TableCell>
                <TableCell>
                  <RealInput category={category} disabled={!editableRealValues} />
                </TableCell>
              </TableRow>
          ))}
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
  label: PropTypes.string.isRequired,
  PlannedInput: PropTypes.func.isRequired,
  RealInput: PropTypes.func.isRequired,
};

export default injectIntl(BudgetTable);

