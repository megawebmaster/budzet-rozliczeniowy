import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Container, Segment } from 'semantic-ui-react';

import { ErrorMessage } from '../../components/error-message';
import { BudgetAccessForm } from '../../components/budget-access-form';

const AccessBudget = ({ loading, errors, intl }) => {
  const translate = (id, message) => intl.formatMessage({ id, defaultMessage: message });

  return (
    <Fragment>
      <Helmet>
        <title>{translate('views.access-budget.title', 'Zatwierdź udostępniony budżet')}</title>
      </Helmet>
      <Container text>
        <Segment>
          <h3>{translate('views.access-budget.title', 'Zatwierdź udostępniony budżet')}</h3>
        </Segment>
        {errors.map(error => <ErrorMessage key={error} error={translate(error, '')} />)}
        <Segment basic loading={loading} className="content-container">
          <BudgetAccessForm />
        </Segment>
      </Container>
    </Fragment>
  );
};

AccessBudget.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AccessBudget;
