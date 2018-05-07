import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

export default class extends PureComponent {
  static propTypes = {
    error: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
  };

  state = {
    visible: true,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  hide = () => this.setState({ visible: false });

  render() {
    if (!this.state.visible) {
      return null;
    }

    return <Message error icon="warning circle" header={this.translate('error-title', 'Coś poszło nie tak…')}
                    content={this.props.error} onDismiss={this.hide} />;
  }
}
