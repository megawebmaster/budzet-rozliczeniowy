import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';
import * as BudgetActions from '../../stores/budget/BudgetAction';

const mapStateToProps = (state) => ({
  categories: state.categories.income,
  data: (state.budget[state.location.payload.year] || { income: {} }).income[state.location.payload.month] || {},
  year: state.location.payload.year,
  month: state.location.payload.month,
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(CategoriesActions.addIncomeCategory(name)),
  updatePlanned: (year, month, categoryId, value) => dispatch(BudgetActions.updatePlanned(year, month, categoryId, value)),
  updateReal: (year, month, categoryId, value) => dispatch(BudgetActions.updateReal(year, month, categoryId, value)),
});

// TODO: Move it to functional style
class IncomeBudgetTable extends Component {
  render() {
    const { label, categories, data, className, year, month, addCategory, updatePlanned, updateReal } = this.props;

    return <BudgetTable className={className} label={label} categories={categories} data={data}
                        editableRealValues={true} onAdd={addCategory} onUpdatePlanned={updatePlanned.bind(null, year, month)}
                        onUpdateReal={updateReal.bind(null, year, month)} />
  }
}

IncomeBudgetTable.propTypes = {
  label: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeBudgetTable);

