import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeCategory, updateCategory } from '../../categories';
import CategoryName from './category-name';

const mapDispatchToProps = (dispatch, { type, category }) => ({
  onRemove: () => dispatch(removeCategory(type, category.id)),
  onEdit: (name) => dispatch(updateCategory(type, category, { name })),
});

const CategoryNameContainer = ({ category, onRemove, deletable, onEdit }) => (
  <CategoryName category={category} onRemove={onRemove} deletable={deletable} onEdit={onEdit} editable={deletable} />
);

CategoryNameContainer.propTypes = {
  category: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  deletable: PropTypes.bool,
};
CategoryNameContainer.defaultProps = {
  deletable: false,
};

export default connect(null, mapDispatchToProps)(CategoryNameContainer);

