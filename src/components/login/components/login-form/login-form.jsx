import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';

import { Authenticator } from '../../../../App.auth';

export default class LoginForm extends PureComponent {
  static propTypes = {
    error: PropTypes.string,
    intl: PropTypes.any.isRequired,
    magicMessageSent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: '',
  };

  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    email: '',
    sending: false,
  };

  updateEmail = (event) => this.setState({ email: event.target.value });

  sendMagicLink = () => {
    const { email } = this.state;

    this.setState({ sending: true }, () => {
      Authenticator.login(email, () => this.props.magicMessageSent(email));
    });
  };

  render() {
    const { error } = this.props;
    const { email, sending } = this.state;

    return (
      <Fragment>
        <Header as="h2" color="teal" textAlign="center">
          {this.translate('views.login.title', 'Zaloguj się do swojego konta')}
        </Header>
        <Form size="large">
          {error && <Message error icon="warning circle" content={this.translate(error, '')} visible />}
          <Segment>
            <Form.Input fluid icon="user" iconPosition="left" onChange={this.updateEmail} value={email}
                        disabled={sending} placeholder={this.translate('views.login.form-email', 'Adres e-mail')} />
            <Button color="teal" fluid size="large" onClick={this.sendMagicLink} loading={sending}>
              {this.translate('views.login.form-button', 'Wyślij mi magiczny link')}
            </Button>
          </Segment>
        </Form>
        <Message>
          {this.translate('views.login.new-message', 'Nie masz jeszcze konta? Po prostu zaloguj się, a my utworzymy je dla Ciebie!')}
        </Message>
      </Fragment>
    );
  }
}
