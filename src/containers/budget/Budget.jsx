import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BudgetView from '../../components/budget/Budget';

const mapStateToProps = (state) => ({
  expensesCategories: state.categories.expenses || [],
});

const mapDispatchToProps = (dispatch) => ({});

class Budget extends Component {
  render() {
    const { expensesCategories } = this.props;

    return <BudgetView expensesCategories={expensesCategories} />;
  }
}

Budget.propTypes = {
  expensesCategories: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);

