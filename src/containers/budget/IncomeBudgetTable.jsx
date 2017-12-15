import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BudgetTable from '../../components/budget/BudgetTable';

const mapStateToProps = (state) => ({
  categories: state.categories.income,
  data: (state.budget[state.location.payload.year] || { income: {} }).income[state.location.payload.month] || {}
});

const mapDispatchToProps = (dispatch) => ({});

class IncomeBudgetTable extends Component {
  addCategory = (categoryName) => {
    // TODO: Dispatch correct action for adding category
    console.log('add new category: ', categoryName);
  };

  render() {
    const { label, categories, data, className } = this.props;
    return <BudgetTable className={className} label={label} categories={categories} data={data}
                        onAdd={this.addCategory} />
  }
}

IncomeBudgetTable.propTypes = {
  label: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeBudgetTable);

