import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dimmer, Form, Header, Message, Segment } from 'semantic-ui-react';

import { Encryptor } from '../../../App.encryption';
import './password-requirement.css';

export default class extends Component {
  static propTypes = {
    budget: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    continueActions: PropTypes.func.isRequired,
    error: PropTypes.string,
    intl: PropTypes.any.isRequired,
    requirePassword: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    error: '',
  };

  state = {
    password: '',
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  updatePassword = (event) => this.setState({ password: event.target.value });

  setEncryptionPassword = () => {
    Encryptor.setPassword2(this.props.budget, this.state.password);
    this.setState({ password: '' });
    this.props.continueActions();
  };

  render() {
    const { children, error, loading, requirePassword } = this.props;
    const { password } = this.state;

    return (
      <Dimmer.Dimmable as="div" dimmed={requirePassword}>
        {children}
        <Dimmer inverted active={requirePassword}>
          <Segment className="password-requirement">
            <Header as="h2" color="teal" textAlign="center">
              {this.translate('views.login.encryption-password', 'Podaj hasło szyfrujące')}
            </Header>
            <Form size="large">
              {error && <Message error icon="warning circle" content={this.translate(error, '')} visible />}
              <Form.Input fluid type="password" icon="lock" iconPosition="left" onChange={this.updatePassword}
                          value={password} error={!!error} disabled={loading} />
              <Button color="teal" fluid size="large" onClick={this.setEncryptionPassword} loading={loading} disabled={loading}>
                {this.translate('views.login.encryption-button', 'Odszyfruj dane')}
              </Button>
            </Form>
          </Segment>
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }
}

