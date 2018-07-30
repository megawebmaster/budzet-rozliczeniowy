import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, DropdownItem, Form, FormInput, Label, Modal, ModalHeader, ModalContent, ModalActions } from 'semantic-ui-react';

import './rename-budget.css';

export default class RenameBudget extends PureComponent {
  static propTypes = {
    budget: PropTypes.object,
    error: PropTypes.string,
    saving: PropTypes.bool,
    renameBudget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    budget: {
      id: 0,
      name: '',
    },
    error: '',
    saving: false,
  };

  state = {
    id: this.props.budget.id,
    name: this.props.budget.name,
    visible: false,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  updateName = (e) => this.setState({ name: e.target.value });
  open = () => this.setState({ visible: true });
  close = () => this.setState({ visible: false });
  save = () => this.props.renameBudget(this.props.budget, this.state.name);

  static getDerivedStateFromProps(props, state) {
    if (props.budget.id !== state.id) {
      return ({
        id: props.budget.id,
        name: props.budget.name,
      });
    }

    return null;
  }

  componentDidUpdate(nextProps) {
    if (this.props.saving && !nextProps.error && !nextProps.saving) {
      this.close();
    }
  }

  render() {
    const { name, saving, visible } = this.state;
    const { error } = this.props;

    return (
      <Modal
        open={visible}
        onClose={this.close}
        size="tiny"
        trigger={<DropdownItem text={this.format('header.budget-settings.rename', 'Zmień nazwę')} onClick={this.open}/>}
      >
        <ModalHeader>{this.translate('rename-budget.header', 'Zmiana nazwy budżetu')}</ModalHeader>
        <ModalContent>
          <Form>
            <FormInput
              disabled={saving}
              error={!!error}
              fluid
              label={this.translate('rename-budget.label', 'Nazwa budżetu')}
              onChange={this.updateName}
              value={name}
            />
            {error && <Label pointing>{error}</Label>}
          </Form>
        </ModalContent>
        <ModalActions>
          <Button
            color="red"
            content={this.translate('rename-budget.cancel-action', 'Anuluj')}
            disabled={saving}
            onClick={this.close}
          />
          <Button
            color="green"
            content={this.translate('rename-budget.save-action', 'Zapisz')}
            icon={!saving ? "save" : null}
            onClick={this.save}
            loading={saving}
          />
        </ModalActions>
      </Modal>
    );
  };
}
