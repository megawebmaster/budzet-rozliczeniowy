import React from 'react';
import { connect } from 'react-redux';

import Input from '../../components/price-input/PriceInput';

const mapStateToProps = (state) => {
  const budget = state.budget[state.location.payload.year] || { income: {}, expenses: {} };
  const income = (budget.income[state.location.payload.month] || {});
  const expenses = (budget.expenses[state.location.payload.month] || {});

  const expensesSum = Object.keys(expenses).reduce((result, categoryId) => result + expenses[categoryId].real, 0.0);
  const incomeSum = Object.keys(income).reduce((result, categoryId) => result + income[categoryId].real, 0.0);

  return {
    value: incomeSum - expensesSum,
  };
};
const emptyFunc = () => {};

const SummaryRealValueLeft = ({ value }) => (
  <Input value={value} disabled={true} isSaving={false} placeholder="" onChange={emptyFunc} onMount={emptyFunc} />
);

export default connect(mapStateToProps)(SummaryRealValueLeft);
