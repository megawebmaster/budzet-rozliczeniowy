import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetView from '../../components/budget/Budget';

// TODO: Move fetching data to reselect?
const mapStateToProps = (state) => ({
  expensesCategories: state.categories.expenses || [],
  incomeCategories: state.categories.income || [],
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(CategoriesActions.addExpensesCategory(name)),
});

const Budget = ({ expensesCategories, incomeCategories, addCategory }) => (
  <BudgetView expensesCategories={expensesCategories} incomeCategories={incomeCategories}
              onAddExpensesCategory={addCategory} />
);

Budget.propTypes = {
  expensesCategories: PropTypes.array.isRequired,
  incomeCategories: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);

