import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeCategory } from '../../categories';
import CategoryName from './category-name';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemove: () => dispatch(removeCategory(ownProps.type, ownProps.category.id)),
});

const CategoryNameContainer = ({ category, onRemove }) => (
  <CategoryName category={category} onRemove={onRemove} />
);

CategoryNameContainer.propTypes = {
  category: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(CategoryNameContainer);

