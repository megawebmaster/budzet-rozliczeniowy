import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BudgetView from './budget';
import { expensesCategories, incomeCategories } from '../../categories';

const mapStateToProps = (state) => ({
  expensesCategories: expensesCategories(state),
  incomeCategories: incomeCategories(state),
});

const BudgetContainer = ({ expensesCategories, incomeCategories }) => (
  <BudgetView expensesCategories={expensesCategories} incomeCategories={incomeCategories} />
);

BudgetContainer.propTypes = {
  expensesCategories: PropTypes.array.isRequired,
  incomeCategories: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(BudgetContainer);

