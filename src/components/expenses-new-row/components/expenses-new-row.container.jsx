import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from './expenses-new-row';
import { addItem } from '../../expenses';
import { month, year } from '../../location';
import { expensesCategoriesForDropdown } from '../../expenses-row';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
  categories: expensesCategoriesForDropdown(state),
});

const mapDispatchToProps = dispatch => ({
  addItem: (row, year, month) => dispatch(addItem(row, year, month)),
});

const NewExpensesRowContainer = ({ categories, year, month, addItem, onInputMount }) => (
  <Row year={year} month={month} categories={categories} onAddItem={addItem} onInputMount={onInputMount} />
);

NewExpensesRowContainer.defaultProps = {
  onInputMount: (_type, _input) => {},
};
NewExpensesRowContainer.propTypes = {
  onInputMount: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewExpensesRowContainer);

