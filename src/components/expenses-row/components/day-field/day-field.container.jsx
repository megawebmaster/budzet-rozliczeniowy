import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Field from './day-field';
import { month, year } from '../../../location';
import { DebounceField } from '../../../debounce-field';
import { ErrorField } from '../../../error-field';
import { DayValidator } from '../../../../validators';

const mapStateToProps = (state) => ({
  year: year(state),
  month: month(state),
});

export default connect(mapStateToProps)(injectIntl(DebounceField(ErrorField(Field, { validator: DayValidator }))));

