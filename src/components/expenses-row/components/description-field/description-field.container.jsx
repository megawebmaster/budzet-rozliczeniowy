import { injectIntl } from 'react-intl';

import Field from './description-field';
import { DebounceField } from '../../../debounce-field';
import { ErrorField } from '../../../error-field';
import { NoneValidator } from '../../../../validators';

export default injectIntl(DebounceField(ErrorField(Field, { validator: NoneValidator })));

