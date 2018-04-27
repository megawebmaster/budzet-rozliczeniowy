import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from './expenses-row';
import { removeItem, saveItem } from '../../expenses';
import { month, year } from '../../location';
import { expensesCategoriesForDropdown } from '../expenses-row.selectors';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
  categories: expensesCategoriesForDropdown(state),
});

const mapDispatchToProps = dispatch => ({
  saveItem: (row, year, month) => dispatch(saveItem(row, year, month)),
  removeItem: (row, year, month) => dispatch(removeItem(row, year, month)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  categories: stateProps.categories,
  saveItem: (row) => dispatchProps.saveItem(row, stateProps.year, stateProps.month),
  removeItem: (row) => dispatchProps.removeItem(row, stateProps.year, stateProps.month),
});

const ExpensesGridRowContainer = ({ categories, row, saveItem, removeItem, onInputMount }) => (
    <Row categories={categories} row={row} onSaveItem={saveItem} onRemoveItem={removeItem}
         onInputMount={onInputMount} />
);

ExpensesGridRowContainer.defaultProps = {
  onInputMount: (_type, _input) => {},
};
ExpensesGridRowContainer.propTypes = {
  onInputMount: PropTypes.func,
  row: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExpensesGridRowContainer);

