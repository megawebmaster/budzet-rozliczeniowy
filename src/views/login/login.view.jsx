import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { Authenticator } from '../../App.auth';
import {
  CheckMailbox,
  LoggingIn,
  LoginForm,
  STATUS_CHECK_MAILBOX,
  STATUS_LOGGING_IN
} from '../../components/login';
import './login.css';

export default class LoginView extends PureComponent {
  static propTypes = {
    addLoginError: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    userLoggedIn: PropTypes.func.isRequired,
  };

  componentDidMount() {
    Authenticator.validateLogin(() => this.props.userLoggedIn(), (error) => this.props.addLoginError(error));
  }

  renderComponent = () => {
    switch(this.props.status){
      case STATUS_CHECK_MAILBOX:
        return <CheckMailbox />;
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
