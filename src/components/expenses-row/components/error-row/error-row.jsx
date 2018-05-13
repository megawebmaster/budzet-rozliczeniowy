import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, TableCell, TableRow } from 'semantic-ui-react';

import './error-row.css';

export default class extends Component {
  static propTypes = {
    error: PropTypes.string,
  };
  static defaultProps = {
    error: '',
  };

  state = {
    visible: true,
  };

  hide = () => this.setState({ visible: false });

  render() {
    if (!this.state.visible) {
      return null;
    }

    return (
      <TableRow className="error-row">
        <TableCell colSpan={5}>
          <Message onDismiss={this.hide} error>
            <p>{ this.props.error }</p>
          </Message>
        </TableCell>
      </TableRow>
    );
  }
}
