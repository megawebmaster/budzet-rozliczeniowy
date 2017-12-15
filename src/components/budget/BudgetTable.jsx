import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, Input, Table, TableBody, TableHeader, TableFooter, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';

class BudgetTable extends Component {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  render() {
    const { label, categories, data, className } = this.props;
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
              {this.format('budget.table.header-planned', 'Planowane ({value} zł)', { value: planned })}
            </TableHeaderCell>
            <TableHeaderCell width={4}>
              {this.format('budget.table.header-real', 'Rzeczywiste ({value} zł)', { value: real })}
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          { categories.map(category =>
            <TableRow key={`budget-row-${category.id}`}>
              <TableCell>{category.name}</TableCell>
              <TableCell><Input fluid value={(data[category.id] || { planned: 0.0 }).planned} /></TableCell>
              <TableCell><Input fluid value={(data[category.id] || { real: 0.0 }).real} /></TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              {/*TODO: Maybe it's worth to extract this button?*/}
              <Button fluid icon="plus" size="tiny" basic style={{ textAlign: 'left' }}
                      content={this.translate('budget.table.add-subcategory', 'Dodaj podkategorię')} />
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
  onAdd: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default injectIntl(BudgetTable);

