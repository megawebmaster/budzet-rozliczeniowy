import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import LoginForm from './login-form';
import { magicMessageSent } from '../../login.actions';

const mapDispatchToProps = (dispatch) => ({
  magicMessageSent: () => dispatch(magicMessageSent()),
});

export default connect(null, mapDispatchToProps)(injectIntl(LoginForm));
