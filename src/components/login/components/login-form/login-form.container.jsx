import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import LoginForm from './login-form';
import { magicMessageSent } from '../../login.actions';
import { loginError } from '../../login.selectors';

const mapStateToProps = (state) => ({
  error: loginError(state),
});
const mapDispatchToProps = (dispatch) => ({
  magicMessageSent: (email) => dispatch(magicMessageSent(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginForm));
