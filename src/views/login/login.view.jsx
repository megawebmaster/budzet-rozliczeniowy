import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Authenticator } from '../../App.auth';
import { Encryptor } from '../../App.encryption';
import {
  CheckMailbox,
  EncryptionPasswordForm,
  LoggingIn,
  LoginForm,
  STATUS_CHECK_MAILBOX,
  STATUS_ENCRYPTION_PASSWORD,
  STATUS_LOGGING_IN
} from '../../components/login';
import './login.css';

export default class extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,
    userLoggedIn: PropTypes.func.isRequired,
    setEncryptionPassword: PropTypes.func.isRequired,
  };

  componentDidMount() {
    Authenticator.validateLogin(() => {
      if (Encryptor.hasEncryptionPassword()) {
        this.props.userLoggedIn();
      } else {
        this.props.setEncryptionPassword();
      }
    });
  }

  renderComponent = () => {
    switch(this.props.status){
      case STATUS_CHECK_MAILBOX:
        return <CheckMailbox />;
      case STATUS_ENCRYPTION_PASSWORD:
        return <EncryptionPasswordForm />;
      case STATUS_LOGGING_IN:
        return <LoggingIn />;
      default:
        return <LoginForm />;
    }
  };

  render() {
    return (
      <div className="login-form">
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 650 }}>
            {this.renderComponent()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
