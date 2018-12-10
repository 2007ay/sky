import React from 'react';
import PropTypes from 'prop-types';

import BpkCard from 'bpk-component-card';
import Itinerary from './Itinerary';
import ItineraryFotter from './ItineraryFotter';
import STYLES from './ItineraryCard.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const ItineraryCard = props => (
  <BpkCard className={c('App_card')}>
    <Itinerary legs={props.itinerary.legs} />
    <ItineraryFotter options={props.itinerary.legs.pricingOptions} />
  </BpkCard>
);

ItineraryCard.propTypes = {
  itinerary: PropTypes.instanceOf(Object).isRequired
};

export default ItineraryCard;
