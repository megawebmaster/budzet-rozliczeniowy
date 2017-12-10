import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableHeaderCell, TableRow, TableCell } from 'semantic-ui-react';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

class BudgetSummary extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { className } = this.props;
    return (
      <Table className={className} attached="bottom" singleLine striped compact>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={4}>Podsumowanie</TableHeaderCell>
            <TableHeaderCell width={4}>Planowane: 10,00 zł</TableHeaderCell>
            <TableHeaderCell width={4}>Rzeczywiste: 15,00 zł</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Pozostało do dyspozycji</TableCell>
            <TableCell>0,00 zł</TableCell>
            <TableCell>5,00 zł</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

BudgetSummary.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BudgetSummary));
