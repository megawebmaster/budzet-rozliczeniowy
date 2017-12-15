import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Summary from '../../components/budget/BudgetSummary';

const mapStateToProps = (state) => {
  const budget = ((state.budget[state.location.payload.year] || { expenses: {} }).expenses[state.location.payload.month] || {});

  return Object.keys(budget).reduce((result, categoryId) => {
    result.planned += budget[categoryId].planned;
    result.real += budget[categoryId].real;
    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });
};

const mapDispatchToProps = (dispatch) => ({});

class BudgetSummary extends Component {
  render() {
    const { className, planned, real } = this.props;
    return <Summary className={className} planned={planned} real={real} />;
  }
}

BudgetSummary.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetSummary);
