import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import PasswordRequirement from './password-requirement';
import { budget } from '../../location';
import { error, isLoading, isRequirngPassword } from '../password-requirement.selectors';
import { continueActions } from '../password-requirement.actions';

const mapStateToProps = (state) => ({
  budget: budget(state),
  requirePassword: isRequirngPassword(state),
  error: error(state),
  loading: isLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
  continueActions: () => dispatch(continueActions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PasswordRequirement));
