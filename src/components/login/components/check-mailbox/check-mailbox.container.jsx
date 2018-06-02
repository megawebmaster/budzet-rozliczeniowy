import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import CheckMailbox from './check-mailbox';
import { emailDomain } from '../../login.selectors';

const mapStateToProps = (state) => ({
  domain: emailDomain(state)
});

export default connect(mapStateToProps)(injectIntl(CheckMailbox));
