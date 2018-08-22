import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react';
import { Encryptor } from '../../../App.encryption';

export default class BudgetAccessForm extends Component {
  static propTypes = {
    budgetAccess: PropTypes.object,
    errors: PropTypes.array,
    intl: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    saveAccess: PropTypes.func.isRequired,
  };

  static defaultProps = {
    budget: undefined,
    errors: [],
  };

  state = {
    invalidPassword: false,
    name: '',
    password: '',
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  updateName = (event) => this.setState({ name: event.target.value });
  updatePassword = (event) => this.setState({ password: event.target.value });

  save = async () => {
    const { budgetAccess, saveAccess } = this.props;
    const { name, password } = this.state;
    try {
      const recipient = await Encryptor.decryptWithPassword(password, budgetAccess.recipient);
      saveAccess(budgetAccess, recipient, name, password);
    } catch(e) {
      this.setState({ invalidPassword: true });
    }
  };

  render() {
    const { budgetAccess, errors, loading } = this.props;
    const { invalidPassword, name, password } = this.state;

    return (
      <Form size="large" error={errors.length !== 0 || invalidPassword}>
        {errors.map(error => <Message key={error} error icon="warning circle" content={this.translate(error, '')} />)}
        {invalidPassword && (
          <Message error icon="warning circle" visible
                   content={this.translate('errors.invalid-encryption-password', 'Nieprawidłowe hasło szyfrujące')} />
        )}
        <Form.Input fluid type="text" icon="pencil" iconPosition="left" onChange={this.updateName}
                    label={this.translate('budget-access-form.budget-name', 'Nazwa budżetu')}
                    value={name} error={errors.length !== 0} disabled={loading} />
        <Form.Input fluid type="password" icon="lock" iconPosition="left" onChange={this.updatePassword}
                    label={this.translate('budget-access-form.encryption-password', 'Hasło szyfrujące')}
                    value={password} error={invalidPassword} disabled={loading} />
        <Button color="teal" fluid size="large" loading={loading} disabled={!budgetAccess || loading}
                onClick={this.save}>
          {this.translate('budget-access-form.save', 'Zapisz')}
        </Button>
      </Form>
    );
  }
}

