import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Summary from '../../components/budget/BudgetSummary';

const mapStateToProps = (state) => {
  const budget = state.budget[state.location.payload.year] || { income: {}, expenses: {} };
  const expenses = (budget.expenses[state.location.payload.month] || {});
  const expensesSums = Object.keys(expenses).reduce((result, categoryId) => {
    result.planned += expenses[categoryId].planned;
    result.real += expenses[categoryId].real;
    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });

  return {
    expenses: expensesSums
  };
};

class BudgetSummary extends Component {
  render() {
    const { className, expenses } = this.props;
    return <Summary className={className} expenses={expenses} />;
  }
}

BudgetSummary.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps)(BudgetSummary);
