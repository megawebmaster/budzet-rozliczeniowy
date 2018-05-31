import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import EncryptionPasswordForm from './encryption-password-form';
import { userLoggedIn } from '../../login.actions';

const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: () => dispatch(userLoggedIn()),
});

export default connect(null, mapDispatchToProps)(injectIntl(EncryptionPasswordForm));
