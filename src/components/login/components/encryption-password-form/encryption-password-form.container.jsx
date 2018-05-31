import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import EncryptionPasswordForm from './encryption-password-form';
import { userLoggedIn } from '../../login.actions';
import { loginError } from '../../login.selectors';

const mapStateToProps = (state) => ({
  error: loginError(state),
});
const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: () => dispatch(userLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(EncryptionPasswordForm));
