import React from 'react';
import { connect } from 'react-redux';

import Expenses from './expenses';
import { monthExpenses } from '../expenses.selectors';

// TODO: Add ability to sort data (based on date)
const mapStateToProps = (state) => ({
  rows: monthExpenses(state),
});

const ExpensesContainer = ({ rows }) => (
  <Expenses rows={rows} />
);

export default connect(mapStateToProps)(ExpensesContainer);
