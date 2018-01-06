import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetView from '../../components/budget/Budget';

const mapStateToProps = (state) => ({
  expensesCategories: state.categories.expenses || [],
  incomeCategories: state.categories.income || [],
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(CategoriesActions.addExpensesCategory(name)),
});

// TODO: Move it to functional style
class Budget extends Component {
  render() {
    const { expensesCategories, incomeCategories } = this.props;

    return <BudgetView expensesCategories={expensesCategories} incomeCategories={incomeCategories}
                       onAddExpensesCategory={this.props.addCategory} />;
  }
}

Budget.propTypes = {
  expensesCategories: PropTypes.array.isRequired,
  incomeCategories: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);

