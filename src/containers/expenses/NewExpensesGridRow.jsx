import React  from 'react';
import PropTypes from 'prop-types';
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

const NewExpensesGridRow = ({ categories, year, month, addItem, onInputMount }) => (
  <Row year={year} month={month} categories={categories} onAddItem={addItem} onInputMount={onInputMount} />
);

NewExpensesGridRow.defaultProps = {
  onInputMount: (_type, _input) => {},
};
NewExpensesGridRow.propTypes = {
  onInputMount: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewExpensesGridRow);

