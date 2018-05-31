import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

import { Encryptor } from '../../../../App.encryption';

export default class extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    userLoggedIn: PropTypes.func.isRequired,
  };

  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  state = {
    password: '',
  };

  updatePassword = (event) => this.setState({ password: event.target.value });

  setEncryptionPassword = () => {
    const { password } = this.state;

    Encryptor.setPassword(password);
    this.props.userLoggedIn();
  };

  render() {
    const { password } = this.state;

    return (
      <Fragment>
        <Header as="h2" color="teal" textAlign="center">
          {this.translate('views.login.encryption-password', 'Podaj hasło szyfrujące')}
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input fluid type="password" icon="lock" iconPosition="left" onChange={this.updatePassword}
                        value={password} />
            <Button color="teal" fluid size="large" onClick={this.setEncryptionPassword}>
              {this.translate('views.login.encryption-button', 'Odszyfruj dane')}
            </Button>
          </Segment>
        </Form>
      </Fragment>
    );
  }
}
