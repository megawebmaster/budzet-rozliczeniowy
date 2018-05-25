import { connect } from 'react-redux';

import { removeCategory, updateCategory } from '../../categories';
import CategoryName from './category-name';

const mapDispatchToProps = (dispatch, { type, category }) => ({
  onRemove: () => dispatch(removeCategory(type, category.id)),
  onEdit: (name) => dispatch(updateCategory(type, category, { name })),
  onCancel: (originalName) => {
    if (originalName === category.name) {
      return;
    }
    if (category.saved) {
      dispatch(updateCategory(type, category, { name: originalName }));
    } else {
      dispatch(removeCategory(type, category.id));
    }
  }
});

export default connect(null, mapDispatchToProps)(CategoryName);

