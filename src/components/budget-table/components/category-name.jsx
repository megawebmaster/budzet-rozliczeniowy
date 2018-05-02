import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditableText } from '../../editable-text';

class CategoryName extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    deletable: PropTypes.bool,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    deletable: false,
    editable: false,
  };

  render() {
    const { category, deletable, editable, onRemove, onEdit } = this.props;

    return (
      <EditableText text={category.name} deletable={deletable} onDelete={onRemove} saving={category.saving}
                    editable={editable} onUpdate={onEdit} />
    );
  }
}

export default CategoryName;

