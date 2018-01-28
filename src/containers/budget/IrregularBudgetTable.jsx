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
  const yearlyBudget = state.budget[state.location.payload.year] || { irregular: {} };
  const data = yearlyBudget.irregular[state.location.payload.month] || {};
  const { planned, real } = Object.keys(data).reduce((result, categoryId) => {
    if (categoryIds.indexOf(categoryId) > -1) {
      result.planned += data[categoryId].planned;
      result.real += data[categoryId].real;
    }

    return result;
  }, {
    planned: 0.0,
    real: 0.0,
  });

  return {
    categories,
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
  <BudgetTable className={className} label={label} categories={categories} editableRealValues={false} currency={currency}
               summaryPlanned={summaryPlanned} summaryReal={summaryReal} onAdd={addCategory} manageableCategories={false}
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
