import React from 'react';
import { connect } from 'react-redux';

import Expenses from './expenses';
import { monthExpenses } from '../expenses.selectors';
import { year, month } from '../../location';
import { sortExpenses } from '../expenses.actions';

const mapStateToProps = (state) => ({
  rows: monthExpenses(state),
  year: year(state),
  month: month(state),
});
const mapDispatchToProps = (dispatch) => ({
  sort: (year, month, field) => dispatch(sortExpenses(year, month, field)),
});
const mergeProps = (stateProps, dispatchProps) => ({
  rows: stateProps.rows,
  sortRows: (field) => dispatchProps.sort(stateProps.year, stateProps.month, field),
});

const ExpensesContainer = ({ rows, sortRows }) => (
  <Expenses rows={rows} sortRows={sortRows} />
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExpensesContainer);
