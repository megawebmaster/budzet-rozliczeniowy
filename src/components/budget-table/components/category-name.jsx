import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';
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

    if (category.encrypted) {
      return <Label style={{ width: '100%' }} />;
    }

    return (
      <EditableText text={category.name} error={category.error} deletable={deletable} deleteError={category.deleteError}
                    saving={category.saving} editable={editable} onUpdate={onEdit} onDelete={onRemove}
                    onCancel={onCancel} />
    );
  }
}

export default CategoryName;

