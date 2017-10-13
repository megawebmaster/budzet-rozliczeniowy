import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({});

class IrregularBudget extends Component {
  format = (id, message) => this.props.intl.formatMessage({id, defaultMessage: message});

  render() {
    return (
      <div>
        <Helmet>
          <title>Budżet - wydatki nieregularne</title>
        </Helmet>
        Tutaj będą nieregularne
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(IrregularBudget));

