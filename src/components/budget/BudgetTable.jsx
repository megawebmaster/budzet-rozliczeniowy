import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Button, Input, Table, TableBody, TableHeader, TableFooter, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

class BudgetTable extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { label, categories, className } = this.props;
    return (
      <Table className={className} singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>{label}</TableHeaderCell>
            <TableHeaderCell width={4}>Planowane (10,00 zł)</TableHeaderCell>
            <TableHeaderCell width={4}>Rzeczywiste (20,00 zł)</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          { categories.map(category =>
            <TableRow key={`budget-row-${category.value}`}>
              <TableCell>{category.text}</TableCell>
              <TableCell><Input fluid value="10,00 zł" /></TableCell>
              <TableCell><Input fluid value="20,00 zł" /></TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <Button fluid icon="plus" size="tiny" content="Dodaj podkategorię" basic style={{ textAlign: 'left' }} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

BudgetTable.propTypes = {
  label: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BudgetTable));

