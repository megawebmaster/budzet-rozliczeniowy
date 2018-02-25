import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';

import AddSubcategoryButton from './add-subcategory-button';
import CategoryName from './category-name.container';

// TODO: Show data-saving errors for adding subcategory
class BudgetTable extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    className: PropTypes.string,
    currency: PropTypes.string.isRequired,
    editableRealValues: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    manageableCategories: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,
    onInputMount: PropTypes.func,
    summaryPlanned: PropTypes.number.isRequired,
    summaryReal: PropTypes.number.isRequired,
    PlannedInput: PropTypes.func.isRequired,
    RealInput: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onInputMount: (_type, _category, _input) => {},
    manageableCategories: true,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  currency = (value) => this.props.intl.formatNumber(value, { style: 'currency', currency: this.props.currency });

  render() {
    const {
      label, type, categories, summaryPlanned, summaryReal, editableRealValues, className, onAdd, onInputMount,
      manageableCategories, PlannedInput, RealInput
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
              <TableCell><CategoryName type={type} category={category} /></TableCell>
              <TableCell>
                <PlannedInput categoryId={category.id} onMount={onInputMount.bind(null, 'planned', category)} />
              </TableCell>
              <TableCell>
                <RealInput categoryId={category.id} onMount={onInputMount.bind(null, 'real', category)}
                           disabled={!editableRealValues} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {manageableCategories && <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <AddSubcategoryButton onSave={onAdd} />
            </TableCell>
          </TableRow>
        </TableFooter>}
      </Table>
    );
  }
}

export default injectIntl(BudgetTable);
