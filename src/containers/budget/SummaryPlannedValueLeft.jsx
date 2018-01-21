import React from 'react';
import { connect } from 'react-redux';

import Input from '../PriceInput';

const mapStateToProps = (state) => {
  const budget = state.budget[state.location.payload.year] || { income: {}, expenses: {}, irregular: {} };
  const income = (budget.income[state.location.payload.month] || {});
  const expenses = (budget.expenses[state.location.payload.month] || {});
  const irregular = (budget.irregular[state.location.payload.month] || {});

  const incomeSum = Object.keys(income).reduce((result, categoryId) => result + income[categoryId].planned, 0.0);
  const expensesSum = Object.keys(expenses).reduce((result, categoryId) => result + expenses[categoryId].planned, 0.0);
  const irregularSum = Object.keys(irregular).reduce((result, categoryId) => result + irregular[categoryId].planned, 0.0);

  return {
    value: incomeSum - expensesSum - irregularSum,
  };
};
const emptyFunc = () => {};

const SummaryPlannedValueLeft = ({ value }) => (
  <Input value={value} disabled={true} isSaving={false} placeholder="" onChange={emptyFunc} onMount={emptyFunc} />
);

export default connect(mapStateToProps)(SummaryPlannedValueLeft);
