import React from 'react';
import { connect } from 'react-redux';

import { addExpensesCategory } from '../../categories';
import AddCategoryButton from './add-category-button';

const mapDispatchToProps = (dispatch) => ({
  onSave: (name) => dispatch(addExpensesCategory(name)),
});

const AddCategoryButtonContainer = ({ onSave }) => (
  <AddCategoryButton onSave={onSave} />
);

export default connect(null, mapDispatchToProps)(AddCategoryButtonContainer);

