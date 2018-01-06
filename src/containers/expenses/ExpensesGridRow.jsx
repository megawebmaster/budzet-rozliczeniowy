import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as ExpensesActions from '../../stores/expenses/ExpensesAction';
import Row from '../../components/expenses-grid/ExpensesGridRow';

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
  saveItem: (row, year, month) => dispatch(ExpensesActions.saveItem(row, year, month)),
  removeItem: (row, year, month) => dispatch(ExpensesActions.removeItem(row, year, month)),
});

class ExpensesGridRow extends Component {
  render() {
    const { categories, month, year, row, saveItem, removeItem, onInputMount } = this.props;

    return <Row categories={categories} row={row} month={month} year={year} onSaveItem={saveItem}
                onRemoveItem={removeItem} onInputMount={onInputMount} />;
  }
}

ExpensesGridRow.defaultProps = {
  onInputMount: (_type, _input) => {},
};
ExpensesGridRow.propTypes = {
  onInputMount: PropTypes.func,
  row: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesGridRow);

