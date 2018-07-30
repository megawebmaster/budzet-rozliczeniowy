import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Segment } from 'semantic-ui-react';

const domainsMap = {
  'gmail.com': 'https://mail.google.com',
  'googlemail.com': 'https://mail.google.com',
  'yahoo.com': 'https://mail.yahoo.com',
  'outlook.com': 'https://outlook.live.com/owa/',
  'hotmail.com': 'https://outlook.live.com/owa/',
  'aol.com': 'https://mail.aol.com',
  'protonmail.com': 'https://mail.protonmail.com/login',
  'pm.me': 'https://mail.protonmail.com/login',
  'o2.pl': 'https://poczta.o2.pl',
  'interia.pl': 'https://poczta.interia.pl',
  'interia.eu': 'https://poczta.interia.pl',
  'interia.com': 'https://poczta.interia.pl',
  'vip.interia.pl': 'https://poczta.interia.pl',
  'intmail.pl': 'https://poczta.interia.pl',
  'interiowy.pl': 'https://poczta.interia.pl',
  'poczta.fm': 'https://poczta.interia.pl',
  'pacz.to': 'https://poczta.interia.pl',
  'pisz.to': 'https://poczta.interia.pl',
  'adresik.net': 'https://poczta.interia.pl',
  'ogarnij.se': 'https://poczta.interia.pl',
  'wp.pl': 'https://poczta.wp.pl',
  'onet.pl': 'https://poczta.onet.pl',
};
const systemMap = {
  'gmail.com': 'GMail',
  'googlemail.com': 'GMail',
  'yahoo.com': 'Yahoo',
  'outlook.com': 'Outlook',
  'hotmail.com': 'Outlook',
  'aol.com': 'AOL',
  'protonmail.com': 'ProtonMail',
  'pm.me': 'ProtonMail',
  'o2.pl': 'O2.pl',
  'interia.pl': 'Interia',
  'interia.eu': 'Interia',
  'interia.com': 'Interia',
  'vip.interia.pl': 'Interia',
  'intmail.pl': 'Interia',
  'interiowy.pl': 'Interia',
  'poczta.fm': 'Interia',
  'pacz.to': 'Interia',
  'pisz.to': 'Interia',
  'adresik.net': 'Interia',
  'ogarnij.se': 'Interia',
  'wp.pl': 'WP.pl',
  'onet.pl': 'Onet',
};

export default class CheckMailbox extends PureComponent {
  static propTypes = {
    intl: PropTypes.any.isRequired,
    domain: PropTypes.string.isRequired,
  };

  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });
  format = (id, message, params) => this.props.intl.formatMessage({ id, defaultMessage: message }, params);

  render() {
    return (
      <Fragment>
        <Header as="h2" color="teal" textAlign="center">
          {this.translate('views.login.check-mailbox-title', 'Magiczny link wysłany')}
        </Header>
        <Segment padded>
          <p>{this.translate('views.login.check-mailbox', 'Sprawdź swoją skrzynkę e-mail i kliknij na link w wiadomości od nas, żeby się zalogować')}</p>
          <Button primary as="a" href={domainsMap[this.props.domain]}>
            {this.format('views.login.go-to-mailbox', 'Idź do swojej skrzynki: {value}', {value: systemMap[this.props.domain]})}
          </Button>
        </Segment>
      </Fragment>
    );
  }
}
