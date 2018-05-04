import { injectIntl } from 'react-intl';

import Field from './category-field';
import { ErrorField } from '../../../error-field';
import { NoneValidator } from '../../../../validators';
import { DebounceField } from '../../../debounce-field';

export default injectIntl(DebounceField(ErrorField(Field, { validator: NoneValidator })));

