import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray } from 'redux-form';
import { injectIntl } from 'react-intl';
import { Table, TableBody, TableHeader, TableRow, TableHeaderCell } from 'semantic-ui-react';
import SpendingGridRow from './SpendingGridRow';

const mapStateToProps = (state) => ({
  month: state.location.payload.month,
  initialValues: {
    spending_rows: state.spending.rows[state.location.payload.month] || [{ id: 'new' }]
  }
});

const mapDispatchToProps = (dispatch) => ({});

class SpendingGrid extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  renderRows = ({ fields }) => {
    const { initialValues: { spending_rows } } = this.props;
    return (
      <TableBody>
        {fields.map((row, index) => <SpendingGridRow key={`spending-row-${spending_rows[index].id}`} row={row} />)}
      </TableBody>
    );
  };

  render() {
    // const { handleSubmit } = this.props;

    return (
      <form>
        <Table singleLine striped compact>
          <TableHeader>
            <TableRow>
              <TableHeaderCell width={4}>
                {this.format('spending-grid.headers.category', 'Category')}
              </TableHeaderCell>
              <TableHeaderCell width={2} textAlign="center">
                {this.format('spending-grid.headers.price', 'Price')}
              </TableHeaderCell>
              <TableHeaderCell width={1} textAlign="center">
                {this.format('spending-grid.headers.day', 'Day')}
              </TableHeaderCell>
              <TableHeaderCell width={8}>
                {this.format('spending-grid.headers.description', 'Description')}
              </TableHeaderCell>
              <TableHeaderCell width={1} />
            </TableRow>
          </TableHeader>
          <FieldArray name="spending_rows" component={this.renderRows} />
        </Table>
      </form>
    );
  }
}

const Form = reduxForm({ form: 'spending_grid', enableReinitialize: true })(SpendingGrid);
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Form));
