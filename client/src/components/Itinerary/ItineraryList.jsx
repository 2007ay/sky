// eslint-disable-next-line react/prefer-stateless-function

import moment from 'moment';
import React from 'react';
import ItineraryCard from './ItineraryCard';
import Spinner from '../shared/Spinner/Spinner';
import { apiHost, generateKey, queryParams } from '../../util/app-util';
import STYLES from './ItineraryCard.scss';

const c = className => STYLES[className] || 'UNKNOWN';

class ItineraryList extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, itineraries: [] };
  }

  componentDidMount() {
    const currentTime = moment().format('YYYY-MM-DD');
    queryParams.outbounddate = currentTime;
    queryParams.inbounddate = currentTime;
    fetch(`${apiHost}/api/flights/search`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(queryParams)
    })
      .then(response => response.json())
      .then(results => this.setState({ itineraries: results, loading: false }))
      .catch(console.error);
  }

  render() {
    let comp;
    if (this.state.loading) {
      comp = (
        <div className={c('App_wrap')}>
          <Spinner />
        </div>
      );
    } else {
      comp = this.state.itineraries.map((itinerary, i) => (
        <ItineraryCard itinerary={itinerary} key={generateKey(i)} />
      ));
    }
    return comp;
  }
}

export default ItineraryList;
