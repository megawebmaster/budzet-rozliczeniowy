import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Segment } from 'semantic-ui-react';

export default class LoggingIn extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    return (
      <Fragment>
        <Header as="h2" color="teal" textAlign="center">
          {this.translate('views.login.logging-in', 'Logowanie w toku…')}
        </Header>
        <Segment loading padded="very" />
      </Fragment>
    );
  }
}
