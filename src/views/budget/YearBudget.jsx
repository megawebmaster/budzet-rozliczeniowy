import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({});

class YearBudget extends Component {
  format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

  render() {
    return (
      <div>
        <Helmet>
          <title>Budżet - podsumowanie całoroczne</title>
        </Helmet>
        Tutaj będzie całoroczne podsumowanie
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(YearBudget));

