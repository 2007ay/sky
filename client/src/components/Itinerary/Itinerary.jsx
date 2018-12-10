import React from 'react';
import PropTypes from 'prop-types';
import Outbounded from './Outbounded';
import Inbounded from './Inbounded';

const Itinerary = function Render({ legs }) {
  return (
    <div>
      {legs.outbound ? <Outbounded record={legs.outbound} /> : null}
      {legs.inbound ? <Inbounded record={legs.inbound} /> : null}
    </div>
  );
};

Itinerary.propTypes = {
  legs: PropTypes.instanceOf(Object).isRequired,
};

export default Itinerary;
