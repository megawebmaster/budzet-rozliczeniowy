import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';

import CategoryName from './category-name.container';
import './budget-table.css';

class BudgetTable extends Component {
  static propTypes = {
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      saved: PropTypes.bool.isRequired,
      saving: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
    }),
    categories: PropTypes.array.isRequired,
    className: PropTypes.string,
    currency: PropTypes.string.isRequired,
    editableRealValues: PropTypes.bool.isRequired,
    manageableCategories: PropTypes.bool,
    onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onRemove: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onInputMount: PropTypes.func,
    summaryPlanned: PropTypes.number.isRequired,
    summaryReal: PropTypes.number.isRequired,
    PlannedInput: PropTypes.func.isRequired,
    RealInput: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  static defaultProps = {
    onInputMount: (_type, _category, _input) => {
    },
    onEdit: false,
    onRemove: false,
    manageableCategories: true,
    saving: false,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  currency = (value) => this.props.intl.formatNumber(value, { style: 'currency', currency: this.props.currency });

  onUpdate = (value) => this.props.onEdit && this.props.onEdit(value);
  onRemove = () => this.props.onRemove && this.props.onRemove();
  onCancel = () => !this.props.category.saved && this.props.onRemove && this.props.onRemove();

  render() {
    const {
      category, categories, summaryPlanned, summaryReal, editableRealValues, className, onInputMount,
      manageableCategories, onEdit, onRemove, PlannedInput, RealInput, children
    } = this.props;

    return (
      <Table className={`budget-table ${className ? className : ''}`} singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>
              <CategoryName category={category} deletable={!!onRemove} editable={!!onEdit} onRemove={this.onRemove}
                            onEdit={this.onUpdate} onCancel={this.onCancel} />
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              <span>{this.format('budget.table.header-planned', 'Planowane ({value})', { value: this.currency(summaryPlanned) })}</span>
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              <span>{this.format('budget.table.header-real', 'Rzeczywiste ({value})', { value: this.currency(summaryReal) })}</span>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map(subcategory => (
            <TableRow key={`budget-row-${subcategory.id}`}>
              <TableCell>
                <CategoryName type={category.type} category={subcategory} deletable={manageableCategories}
                              editable={manageableCategories} />
              </TableCell>
              <TableCell>
                <PlannedInput categoryId={subcategory.id} onMount={onInputMount.bind(null, 'planned', subcategory.id)}
                              disabled={subcategory.saving || subcategory.error.length > 0} />
              </TableCell>
              <TableCell>
                <RealInput categoryId={subcategory.id} onMount={onInputMount.bind(null, 'real', subcategory.id)}
                           disabled={!editableRealValues || subcategory.saving || subcategory.error.length > 0} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {children}
      </Table>
    );
  }
}

export default injectIntl(BudgetTable);

