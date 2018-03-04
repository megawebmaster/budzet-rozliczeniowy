import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { Segment } from 'semantic-ui-react';

import NavigableTable from '../../components/NavigableTable';
import { IrregularBudgetTable, isLoading } from '../../components/irregular-budget';
import { irregularCategories } from '../../components/categories';
import { year } from '../../components/location';

const IrregularBudget = ({ categories, loading, year, onFocus, onInputMount, onKeyDown, intl }) => {
  const format = (id, message, params) => intl.formatMessage({id, defaultMessage: message}, params);

  return (
    <div onKeyDown={onKeyDown} onFocus={onFocus}>
      <Helmet>
        <title>{format('views.irregular-budget.title', 'Budżet - wydatki nieregularne {year}', {year})}</title>
      </Helmet>
      <Segment>
        <h3>{format('views.irregular-budget.header', 'Wydatki nieregularne {year} rok', {year})}</h3>
      </Segment>
      <Segment basic loading={loading}>
        <IrregularBudgetTable className="segment blue" categories={categories} onInputMount={onInputMount}
                              label={format('views.irregular-budget.table-label', 'Roczne wydatki nieregularne')} />
      </Segment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: irregularCategories(state),
  year: year(state),
  loading: isLoading(state),
});

const NavigableIrregularBudget = NavigableTable(
  IrregularBudget,
  (props) => props.categories.map(category => category.id)
);
export default connect(mapStateToProps)(injectIntl(NavigableIrregularBudget));

