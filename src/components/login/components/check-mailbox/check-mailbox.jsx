import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Segment } from 'semantic-ui-react';

export default class extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    return (
      <Fragment>
        <Header as="h2" color="teal" textAlign="center">
          {this.translate('views.login.check-mailbox-title', 'Magiczny link wysłany')}
        </Header>
        <Segment padded>
          {this.translate('views.login.check-mailbox', 'Sprawdź swoją skrzynkę e-mail i kliknij na link w wiadomości od nas, żeby się zalogować')}
        </Segment>
      </Fragment>
    );
  }
}
