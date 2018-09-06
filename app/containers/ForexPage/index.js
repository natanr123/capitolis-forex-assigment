/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import JsonTable from 'ts-react-json-table';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import loadProblemWatcher from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ForexPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { storeListing: { title: '', shortDescription: '', fullDescription: '' } };
  }


  componentDidMount() {
    this.props.loadPosition();
    this.props.loadUnits();
  }

  render() {
    const positionsColumns = [
      { key: 'financialUnitName', label: 'Financial Unit Name' },
      { key: 'notionalValue', label: 'Notional Value' },
      { key: 'currencyRate', label: 'Rate' },
      { key: 'currencyName', label: 'Currency' },
      { key: 'calculatedValueUSD', label: 'Calculated Value (in USD)' },
    ];

    const unitsColumns = [
      { key: 'name', label: 'Name' },
      { key: 'positionsCount', label: 'Positions Count' },
      { key: 'positionsSum', label: 'Positions Sum (in USD)' },
    ];


    return (
      <article>
        <Helmet>
          <title>Positions</title>
          <meta
            name="Positions page"
            content="Positions page"
          />
        </Helmet>
        <div>
          <h3>Positions</h3>
          <JsonTable columns={positionsColumns} rows={ this.props.positions } />
        </div>
        <div>
          <h3>Units</h3>
          <JsonTable columns={unitsColumns} rows={ this.props.units } />
        </div>

      </article>
    );
  }


}

export function mapDispatchToProps(dispatch) {
  return {
    loadPosition: () => {
      dispatch(actions.loadPositions());
    },
    loadUnits: () => {
      dispatch(actions.loadUnits());
    }
  };
}

ForexPage.propTypes = {
  loadPosition: PropTypes.func,
  loadUnits: PropTypes.func,
  positions: PropTypes.any,
  units: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => {
  return {
    positions: state.get('forex').get('positions'),
    units: state.get('forex').get('units'),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'forex', reducer });
const withSaga = injectSaga({ key: 'forex', saga: loadProblemWatcher });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForexPage);
