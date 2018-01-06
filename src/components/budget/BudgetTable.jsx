import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';

import AddCategoryButton from './AddCategoryButton';

class BudgetTable extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  // TODO: Extract currency settings to configuration/store so we can fetch it consistently
  currency = (value) => this.props.intl.formatNumber(value, { style: 'currency', currency: 'PLN' });

  render() {
    const {
      label, categories, summaryPlanned, summaryReal, editableRealValues, className, onAdd, onInputMount, PlannedInput,
      RealInput
    } = this.props;

    return (
      <Table className={className} singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>{label}</TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.table.header-planned', 'Planowane ({value})', { value: this.currency(summaryPlanned) })}
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.table.header-real', 'Rzeczywiste ({value})', { value: this.currency(summaryReal) })}
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map(category => (
            <TableRow key={`budget-row-${category.id}`}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <PlannedInput category={category} onMount={onInputMount.bind(null, 'planned', category)} />
              </TableCell>
              <TableCell>
                <RealInput category={category} onMount={onInputMount.bind(null, 'real', category)}
                           disabled={!editableRealValues} />
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

BudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
BudgetTable.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  editableRealValues: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onInputMount: PropTypes.func,
  summaryPlanned: PropTypes.number.isRequired,
  summaryReal: PropTypes.number.isRequired,
  PlannedInput: PropTypes.func.isRequired,
  RealInput: PropTypes.func.isRequired,
};

export default injectIntl(BudgetTable);

