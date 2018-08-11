import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dimmer,
  DropdownItem,
  Form,
  FormInput,
  Header,
  List,
  ListContent,
  ListDescription,
  ListHeader,
  ListItem,
  Loader,
  Message,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader
} from 'semantic-ui-react';

import './share-budget.css';

export default class ShareBudget extends PureComponent {
  static propTypes = {
    budget: PropTypes.object,
    error: PropTypes.string,
    loadMembers: PropTypes.func.isRequired,
    members: PropTypes.array,
    saving: PropTypes.bool,
    shareBudget: PropTypes.func.isRequired,
    removeBudgetMember: PropTypes.func.isRequired,
  };

  static defaultProps = {
    budget: {
      id: 0,
      name: '',
    },
    error: '',
    members: undefined,
    saving: false,
  };

  state = {
    email: '',
    visible: false,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  updateEmail = (e) => this.setState({ email: e.target.value });
  open = () => {
    this.setState({ visible: true });
    this.props.loadMembers(this.props.budget);
  };
  close = () => this.setState({ visible: false });
  save = () => {
    if (!this.state.email.length) {
      return;
    }
    this.props.shareBudget(this.props.budget, this.state.email);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.saving && !this.props.saving && !this.props.error) {
      this.setState({ email: '' });
    }
  }

  render() {
    const { email, visible } = this.state;
    const { budget, error, members, removeBudgetMember, saving } = this.props;
    // TODO: Split this up properly...

    return (
      <Modal
        open={visible}
        onClose={this.close}
        size="large"
        trigger={<DropdownItem
          text={this.translate('header.budget-settings.share', 'Udostępnianie')}
          onClick={this.open}
        />}
      >
        <ModalHeader>{this.translate('share-budget.header', 'Udostępnianie budżetu')}</ModalHeader>
        <Dimmer.Dimmable as={ModalContent} dimmed={!members}>
          <Header as="h3">{this.translate('share-budget.access.header', 'Kto ma dostęp')}</Header>
          <List relaxed="very" divided>
            {members && members.map(member => (
              <ListItem key={member.name}>
                {budget.userId !== member.userId && (
                  <ListContent floated="right">
                    <Button
                      icon="remove user"
                      color="red"
                      size="tiny"
                      content={this.translate('share-budget.access.remove', 'Usuń')}
                      onClick={() => removeBudgetMember(budget, member)}
                    />
                  </ListContent>
                )}
                {budget.userId === member.userId && (
                  <ListContent floated="right">
                    <Button
                      icon="user secret"
                      color="blue"
                      size="tiny"
                      disabled
                      content={this.translate('share-budget.access.owner', 'Właściciel')}
                    />
                  </ListContent>
                )}
                <ListHeader>{member.name}</ListHeader>
                <ListDescription>
                  <List horizontal>
                    {member.abilities.map(ability => (
                      <ListItem key={`${member.name}-${ability}`}>
                        {this.translate(`share-budget.access.permission-${ability}`, ability)}
                      </ListItem>
                    ))}
                  </List>
                </ListDescription>
              </ListItem>
            ))}
            <ListItem as={Form} onSubmit={this.save}>
              <ListContent>
                <FormInput
                  icon="add user"
                  iconPosition="left"
                  disabled={saving}
                  error={!!error}
                  fluid
                  placeholder={this.translate('share-budget.access.new', 'Podaj adres e-mail')}
                  onChange={this.updateEmail}
                  value={email}
                  action={{
                    icon: 'plus circle',
                    color: 'green',
                    content: this.translate('share-budget.access.add', 'Udostępnij'),
                    type: 'submit',
                    disabled: saving,
                    loading: saving,
                  }}
                />
              </ListContent>
              {error && (
                <ListDescription className="red">{this.translate(error, '')}</ListDescription>
              )}
            </ListItem>
          </List>
          <Message
            warning
            header={this.translate('share-budget.reminder-title', 'Ważne')}
            content={this.translate('share-budget.reminder-content', 'Pamiętaj o przekazaniu hasła szyfrującego' +
              ' odbiorcy - w przeciwnym wypadku nie będzie mógł odczytać zapisanych danych! Dobrym pomysłem jest' +
              ' przekazanie go osobiście lub przesłanie SMSem.')}
          />
          <Dimmer active={!members} inverted>
            <Loader />
          </Dimmer>
        </Dimmer.Dimmable>
        <ModalActions>
          <Button
            type="button"
            content={this.translate('share-budget.close', 'Zamknij')}
            disabled={saving}
            onClick={this.close}
          />
        </ModalActions>
      </Modal>
    );
  };
}
