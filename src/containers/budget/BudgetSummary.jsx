import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Summary from '../../components/budget/BudgetSummary';

const mapStateToProps = (state) => {
  const budget = state.budget[state.location.payload.year] || { income: {}, expenses: {} };
  const income = (budget.income[state.location.payload.month] || {});
  const expenses = (budget.expenses[state.location.payload.month] || {});
  const expensesSums = Object.keys(expenses).reduce((result, categoryId) => {
    result.planned += expenses[categoryId].planned;
    result.real += expenses[categoryId].real;
    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });
  const incomeSums = Object.keys(income).reduce((result, categoryId) => {
    result.planned += income[categoryId].planned;
    result.real += income[categoryId].real;
    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });

  return {
    expenses: expensesSums,
    leftToUse: {
      planned: incomeSums.planned - expensesSums.planned,
      real: incomeSums.real - expensesSums.real,
    }
  };
};

const mapDispatchToProps = (dispatch) => ({});

class BudgetSummary extends Component {
  render() {
    const { className, expenses, leftToUse } = this.props;
    return <Summary className={className} expenses={expenses} leftToUse={leftToUse} />;
  }
}

BudgetSummary.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetSummary);
