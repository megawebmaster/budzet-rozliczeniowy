import { injectIntl } from 'react-intl';

import Field from './edit-field';
import { ErrorField } from '../../../error-field';
import { NoneValidator } from '../../../../validators';

export default injectIntl(ErrorField(Field, { validator: NoneValidator }));

