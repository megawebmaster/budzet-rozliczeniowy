import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import './login.css';

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({});

class LoginForm extends React.Component {
  componentWillMount() {
    const { isLoggedIn, history } = this.props;
    if (isLoggedIn) {
      history.replace('/');
    }
  }

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
                <Button color="teal" fluid size="large" as={NavLink} to="/2017/budget">Login</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));

