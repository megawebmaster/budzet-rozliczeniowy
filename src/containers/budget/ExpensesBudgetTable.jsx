import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';

const mapStateToProps = (state, ownProps) => ({
  categories: (state.categories.expenses.find((category) => category.id === ownProps.categoryId) || {}).children,
  data: (state.budget[state.location.payload.year] || { expenses: {} }).expenses[state.location.payload.month] || {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSubcategory: (name) => dispatch(CategoriesActions.addExpensesSubcategory(ownProps.categoryId, name)),
  updatePlanned: (categoryId, value) => { console.log('update for planned', categoryId, value); },
  updateReal: (categoryId, value) => { console.log('update for real', categoryId, value); },
});

// TODO: Move it to functional style
class ExpensesBudgetTable extends Component {
  render() {
    const { label, categories, data, className, addSubcategory, updatePlanned, updateReal } = this.props;

    return <BudgetTable className={className} label={label} categories={categories} data={data}
                        editableRealValues={false} onAdd={addSubcategory} onUpdatePlanned={updatePlanned}
                        onUpdateReal={updateReal} />
  }
}

ExpensesBudgetTable.propTypes = {
  className: PropTypes.string,
  categoryId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesBudgetTable);

