import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Summary from './budget-summary';
import { plannedExpenses, realExpenses } from '../../expenses-budget-table';
import { plannedIrregular } from '../../irregular-budget-table';
import { plannedSavings, realSavings } from '../../savings-budget-table';

const mapStateToProps = (state) => ({
  planned: plannedExpenses(state) + plannedIrregular(state) + plannedSavings(state),
  real: realExpenses(state) + plannedIrregular(state) + realSavings(state),
});

const BudgetSummaryContainer = ({ className, planned, real }) => (
  <Summary className={className} planned={planned} real={real} />
);

BudgetSummaryContainer.propTypes = {
  className: PropTypes.string,
};

export default connect(mapStateToProps)(BudgetSummaryContainer);
