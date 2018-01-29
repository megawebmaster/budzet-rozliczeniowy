import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Summary from './budget-summary';
import { plannedExpenses, realExpenses } from '../../expenses-budget-table';
import { plannedIrregular, realIrregular } from '../../irregular-budget-table';

const mapStateToProps = (state) => ({
  planned: plannedExpenses(state) + plannedIrregular(state),
  real: realExpenses(state) + realIrregular(state),
});

const BudgetSummaryContainer = ({ className, planned, real }) => (
  <Summary className={className} planned={planned} real={real} />
);

BudgetSummaryContainer.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps)(BudgetSummaryContainer);
