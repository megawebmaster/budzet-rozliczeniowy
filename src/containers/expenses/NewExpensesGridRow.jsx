import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ExpensesActions from '../../stores/expenses/ExpensesAction';
import Row from '../../components/expenses-grid/NewExpensesGridRow';

const mapStateToProps = (state) => {
  const categories = [];
  state.categories.expenses.forEach(category => {
    category.children.forEach(subcategory => {
      categories.push({ text: `${category.name} - ${subcategory.name}`, value: subcategory.id });
    })
  });

  return ({
    year: state.location.payload.year,
    month: state.location.payload.month,
    categories,
  });
};

const mapDispatchToProps = dispatch => ({
  addItem: (row, year, month) => dispatch(ExpensesActions.addItem(row, year, month)),
});

class NewExpensesGridRow extends Component {
  render() {
    const { categories, year, month, addItem } = this.props;

    return <Row year={year} month={month} categories={categories} onAddItem={addItem} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExpensesGridRow);

