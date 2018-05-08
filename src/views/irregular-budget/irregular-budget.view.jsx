import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';

import NavigableTable from '../../components/NavigableTable';
import { errors, IrregularBudgetTable, isLoading } from '../../components/irregular-budget';
import { irregularCategories } from '../../components/categories';
import { year } from '../../components/location';
import './irregular-budget.css';
import { ErrorMessage } from '../../components/error-message';

const IrregularBudget = ({ categories, loading, errors, year, onFocus, onInputMount, onKeyDown, intl }) => {
  const format = (id, message, params) => intl.formatMessage({ id, defaultMessage: message }, params);

  return (
    <div onKeyDown={onKeyDown} onFocus={onFocus}>
      <Helmet>
        <title>{format('views.irregular-budget.title', 'Budżet - wydatki nieregularne {year}', { year })}</title>
      </Helmet>
      <Segment>
        <h3>{format('views.irregular-budget.header', 'Wydatki nieregularne {year} rok', { year })}</h3>
      </Segment>
      {errors.map(error => <ErrorMessage key={error} error={error} />)}
      <Segment basic loading={loading} className="irregular-container">
        <IrregularBudgetTable className="segment blue" categories={categories} onInputMount={onInputMount}
                              label={format('views.irregular-budget.table-label', 'Roczne wydatki nieregularne')} />
      </Segment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: irregularCategories(state),
  year: year(state),
  errors: errors(state),
  loading: isLoading(state),
});

const NavigableIrregularBudget = NavigableTable(IrregularBudget, {
  getItems: (props) => props.categories.map(category => category.id)
});
export default connect(mapStateToProps)(injectIntl(NavigableIrregularBudget));

