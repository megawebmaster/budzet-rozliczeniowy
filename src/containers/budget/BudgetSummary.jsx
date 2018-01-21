import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Summary from '../../components/budget/BudgetSummary';

const mapStateToProps = (state) => {
  const budget = state.budget[state.location.payload.year] || { irregular: {}, expenses: {} };
  const expenses = (budget.expenses[state.location.payload.month] || {});
  const irregular = (budget.irregular[state.location.payload.month] || {});
  const expensesSums = Object.keys(expenses).reduce((result, categoryId) => {
    result.planned += expenses[categoryId].planned;
    result.real += expenses[categoryId].real;
    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });
  const irregularSums = Object.keys(irregular).reduce((result, categoryId) => {
    result.planned += irregular[categoryId].planned;
    result.real += irregular[categoryId].real;
    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });

  return {
    expenses: {
      planned: expensesSums.planned + irregularSums.planned,
      real: expensesSums.real + irregularSums.real,
    }
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
