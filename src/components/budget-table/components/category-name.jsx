import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import './category-name.css';

class CategoryName extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  render() {
    const { category, onRemove } = this.props;

    return (
      <div className="category-name clearfix">
        <Button icon="trash" color="red" size="mini" floated="right" onClick={onRemove} />
        <span>{category.name}</span>
      </div>
    );
  }
}

export default CategoryName;

