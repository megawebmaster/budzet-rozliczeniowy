import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Button, Segment, SegmentGroup } from 'semantic-ui-react';
import './spending.css';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

class Spending extends Component {
  format = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  render() {
    const { match: { params } } = this.props;
    const { month, year } = params;

    return (
      <div>
        <Helmet>
          <title>Rozliczenie - {this.format(`month.${month}`, month)} {year}</title>
        </Helmet>
        <SegmentGroup horizontal>
          <Segment>
            <h3>
              Rozliczenie: {this.format(`month.${month}`, month)} {year}
            </h3>
          </Segment>
          <Button as={NavLink} to={`/${year}/budget/${month}`} size="big" attached="right" className="budget"
                  content="Budżet" labelPosition="right" icon="arrow right" />
        </SegmentGroup>
        <Segment>
          <p>Rozliczenie</p>
        </Segment>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Spending));

