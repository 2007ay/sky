import React from 'react';
import PropTypes from 'prop-types';
import BpkButton from 'bpk-component-button';
import { getFormattedCurrency, queryParams } from '../../util/app-util';

import STYLES from './ItineraryCard.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const ItineraryFotter = function Render({ options }) {
  const { price, agents } = options[0];
  const agent = agents[0];
  return (
    <div className={c('App_footer')}>
      <div className={c('App_footer_spans')}>
        <span className={c('App_footer_spans_price')}>{getFormattedCurrency(price, queryParams.locale, queryParams.currency)}</span>
        <span className={c('App_footer_spans_agent')}> {agent.name}</span>
      </div>
      <div className={c('App_footer_btn')}>
        <BpkButton>Select</BpkButton>
      </div>
    </div>
  );
};

ItineraryFotter.propTypes = {
  options: PropTypes.instanceOf(Object).isRequired
};

export default ItineraryFotter;
