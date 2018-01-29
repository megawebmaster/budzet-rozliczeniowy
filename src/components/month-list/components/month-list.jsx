import React from 'react';
import { NavLink } from 'redux-first-router-link';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import * as _ from 'lodash';

const MonthList = ({ baseRoute, intl }) => {
  const format = (id, message) => intl.formatMessage({id, defaultMessage: message});

  return (
    <Menu vertical fluid>
      {_.times(12, (month) => (
        <Menu.Item key={`month-${month}`} name={`month-${month+1}`} as={NavLink} activeClassName="active"
                   to={{ ...baseRoute, payload: { ...baseRoute.payload, month: month + 1 }}}>
          {format(`month.${month+1}`, month+1)}
        </Menu.Item>
      ))}
    </Menu>
  );
};

MonthList.propTypes = {
  baseRoute: PropTypes.object.isRequired,
};

export default injectIntl(MonthList);

