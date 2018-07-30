import React from 'react';
import { connect } from 'react-redux';

import { addCategory } from '../../categories';
import { AddCategoryButton } from '../../add-button';

const mapDispatchToProps = (dispatch) => ({
  onSave: (name) => dispatch(addCategory('expense', name)),
});

const AddCategoryButtonContainer = ({ onSave }) => (
  <AddCategoryButton onSave={onSave} />
);

export default connect(null, mapDispatchToProps)(AddCategoryButtonContainer);

