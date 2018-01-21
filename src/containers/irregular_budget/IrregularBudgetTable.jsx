import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CategoriesActions from '../../stores/categories/CategoriesAction';
import BudgetTable from '../../components/budget/BudgetTable';
import IrregularPlannedPriceInput from './IrregularPlannedPriceInput';
import IrregularRealPriceInput from './IrregularRealPriceInput';

const mapStateToProps = (state) => {
  const categories = state.categories.irregular;
  const categoryIds = categories.map(category => category.id.toString());
  const irregularBudget = state.irregular_budget[state.location.payload.year] || {};

  const { planned, real } = Object.keys(irregularBudget).reduce((result, categoryId) => {
    if (categoryIds.indexOf(categoryId) > -1) {
      result.planned += irregularBudget[categoryId].planned;
      result.real += irregularBudget[categoryId].real;
    }

    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });

  return {
    currency: state.configuration.currency.type,
    summaryPlanned: planned,
    summaryReal: real,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCategory: (name) => dispatch(CategoriesActions.addIrregularCategory(name)),
});

const IrregularBudgetTable = ({ label, currency, categories, summaryPlanned, summaryReal, className, addCategory,
                                onInputMount }) => (
  <BudgetTable className={className} label={label} categories={categories} editableRealValues={false}
               summaryPlanned={summaryPlanned} summaryReal={summaryReal} onAdd={addCategory} currency={currency}
               onInputMount={onInputMount} PlannedInput={IrregularPlannedPriceInput} RealInput={IrregularRealPriceInput} />
);

IrregularBudgetTable.defaultProps = {
  onInputMount: (_type, _category, _input) => {},
};
IrregularBudgetTable.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  onInputMount: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IrregularBudgetTable);

