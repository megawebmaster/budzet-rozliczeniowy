import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import { Authenticator } from '../../App.auth';
import './login.css';
import { Encryptor } from '../../App.encryption';

const STATUS_NEW = 'new';
const STATUS_SENDING_MESSAGE = 'sending-message';
const STATUS_CHECK_MAILBOX = 'check-mailbox';
const STATUS_LOGGING_IN = 'logging-in';
const STATUS_ENCRYPTION_PASSWORD = 'encryption-password';

// TODO: Simplify this component - make separate sub-components that show different states
class LoginView extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    userLoggedIn: PropTypes.func.isRequired,
  };

  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    email: '',
    password: '',
    status: STATUS_NEW,
  };

  updateEmail = (event) => this.setState({ email: event.target.value });
  updatePassword = (event) => this.setState({ password: event.target.value });

  sendMagicLink = () => {
    const { email } = this.state;

    this.setState({ status: STATUS_SENDING_MESSAGE }, () => {
      Authenticator.login(email, () => this.setState({ status: STATUS_CHECK_MAILBOX }));
    });
  };

  setEncryptionPassword = () => {
    const { password } = this.state;

    Encryptor.setPassword(password);
    this.setState({ status: STATUS_LOGGING_IN });
    this.props.userLoggedIn();
  };

  componentDidMount() {
    Authenticator.validateLogin(() => {
      if (Encryptor.hasEncryptionPassword()) {
        this.setState({ status: STATUS_LOGGING_IN });
        this.props.userLoggedIn();
      } else {
        this.setState({ status: STATUS_ENCRYPTION_PASSWORD });
      }
    });
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    const { email, password, status } = this.state;

    return (
      <div className="login-form">
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 650 }}>
            <Header as="h2" color="teal" textAlign="center">
              {status === STATUS_ENCRYPTION_PASSWORD && this.translate('views.login.encryption-password', 'Podaj hasło szyfrujące')}
              {status === STATUS_LOGGING_IN && this.translate('views.login.logging-in', 'Logowanie w toku…')}
              {status === STATUS_CHECK_MAILBOX && this.translate('views.login.check-mailbox-title', 'Magiczny link wysłany')}
              {[STATUS_NEW, STATUS_SENDING_MESSAGE].indexOf(status) !== -1 && this.translate('views.login.title', 'Zaloguj się do swojego konta')}
            </Header>
            {[STATUS_NEW, STATUS_SENDING_MESSAGE].indexOf(status) !== -1 && <Fragment>
              <Form size="large">
                <Segment>
                  <Form.Input fluid icon="user" iconPosition="left" onChange={this.updateEmail} value={email} disabled={status === STATUS_SENDING_MESSAGE}
                              placeholder={this.translate('views.login.form-email', 'Adres e-mail')} />
                  <Button color="teal" fluid size="large" onClick={this.sendMagicLink} loading={status === STATUS_SENDING_MESSAGE}>
                    {this.translate('views.login.form-button', 'Wyślij mi magiczny link')}
                  </Button>
                </Segment>
              </Form>
              <Message>
                {this.translate('views.login.new-message', 'Nie masz jeszcze konta? Po prostu zaloguj się, a my utworzymy je dla Ciebie!')}
              </Message>
            </Fragment>}
            {[STATUS_ENCRYPTION_PASSWORD].indexOf(status) !== -1 && <Fragment>
              <Form size="large">
                <Segment>
                  <Form.Input fluid type="password" icon="lock" iconPosition="left" onChange={this.updatePassword} value={password} />
                  <Button color="teal" fluid size="large" onClick={this.setEncryptionPassword}>
                    {this.translate('views.login.encryption-button', 'Odszyfruj dane')}
                  </Button>
                </Segment>
              </Form>
            </Fragment>}
            {status === STATUS_CHECK_MAILBOX && <Segment padded>
              {this.translate('views.login.check-mailbox', 'Sprawdź swoją skrzynkę e-mail i kliknij na link w wiadomości od nas, żeby się zalogować')}
            </Segment>}
            {status === STATUS_LOGGING_IN && <Segment loading padded="very" />}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default injectIntl(LoginView);
