import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';

import AddSubcategoryButton from './add-subcategory-button';
import CategoryName from './category-name.container';
import { EditableText } from '../../editable-text';
import './budget-table.css';

class BudgetTable extends Component {
  static propTypes = {
    saving: PropTypes.bool,
    type: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    className: PropTypes.string,
    currency: PropTypes.string.isRequired,
    editableRealValues: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    manageableCategories: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onRemove: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onInputMount: PropTypes.func,
    summaryPlanned: PropTypes.number.isRequired,
    summaryReal: PropTypes.number.isRequired,
    PlannedInput: PropTypes.func.isRequired,
    RealInput: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onInputMount: (_type, _category, _input) => {},
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

  render() {
    const {
      label, saving, type, categories, summaryPlanned, summaryReal, editableRealValues, className, onAdd, onInputMount,
      manageableCategories, onEdit, onRemove, PlannedInput, RealInput
    } = this.props;

    return (
      <Table className={`budget-table ${className ? className : ''}`} singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>
              <EditableText text={label} deletable={!!onRemove} editable={!!onEdit} onDelete={this.onRemove}
                            onUpdate={this.onUpdate} saving={saving} />
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
          {categories.map(category => (
            <TableRow key={`budget-row-${category.id}`}>
              <TableCell>
                <CategoryName type={type} category={category} deletable={manageableCategories}
                              editable={manageableCategories} />
              </TableCell>
              <TableCell>
                <PlannedInput categoryId={category.id} onMount={onInputMount.bind(null, 'planned', category.id)}
                              disabled={category.saving} />
              </TableCell>
              <TableCell>
                <RealInput categoryId={category.id} onMount={onInputMount.bind(null, 'real', category.id)}
                           disabled={!editableRealValues || category.saving} />
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

