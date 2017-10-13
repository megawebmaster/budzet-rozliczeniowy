import React from 'react';
import { NavLink } from 'react-router-dom';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import * as _ from 'lodash';

const MonthList = ({ basePath, intl }) => {
  const format = (id, message) => intl.formatMessage({id, defaultMessage: message});

  return (
    <Menu vertical fluid>
      {_.times(12, (month) => (
        <Menu.Item key={`month-${month}`} name={`month-${month+1}`} as={NavLink} activeClassName="active" to={`${basePath}/${month+1}`}>
          {format(`month.${month+1}`, month+1)}
        </Menu.Item>
      ))}
    </Menu>
  );
};

MonthList.propTypes = {
  basePath: PropTypes.string.isRequired,
};

export default injectIntl(MonthList);

