import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BudgetTable from '../../components/budget/BudgetTable';

const mapStateToProps = (state, ownProps) => ({
  categories: (state.categories.expenses.find((category) => category.id === ownProps.categoryId) || {}).children,
  data: (state.budget[state.location.payload.year] || { expenses: {} }).expenses[state.location.payload.month] || {}
});

const mapDispatchToProps = (dispatch) => ({});

class ExpensesBudgetTable extends Component {
  addCategory = (categoryName) => {
    // TODO: Dispatch correct action for adding category
    console.log('add new category: ', categoryName);
  };

  render() {
    const { label, categories, data, className } = this.props;
    return <BudgetTable className={className} label={label} categories={categories} data={data}
                        editableRealValues={false} onAdd={this.addCategory} />
  }
}

ExpensesBudgetTable.propTypes = {
  className: PropTypes.string,
  categoryId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesBudgetTable);

