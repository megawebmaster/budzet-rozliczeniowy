import React from 'react';
import Link from 'redux-first-router-link';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import './login.css';


class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-form">
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
                <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
                <Button color="teal" fluid size="large" as={Link}
                        to={{ type: 'BUDGET', payload: {month: (new Date().getMonth() + 1)}}}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;

