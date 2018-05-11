import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditableText } from '../../editable-text';

class CategoryName extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    deletable: PropTypes.bool,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    deletable: false,
    editable: false,
  };

  render() {
    const { category, deletable, editable, onRemove, onEdit, onCancel } = this.props;

    return (
      <EditableText text={category.name} error={category.error} deletable={deletable} saving={category.saving}
                    editable={editable} onUpdate={onEdit} onDelete={onRemove} onCancel={onCancel} />
    );
  }
}

export default CategoryName;

