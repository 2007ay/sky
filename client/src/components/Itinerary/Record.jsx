import React from 'react';
import PropTypes from 'prop-types';

import BpkLongArrowRight from 'bpk-component-icon/sm/long-arrow-right';

import STYLES from './ItineraryCard.scss';
import { formatTime, getDuration } from '../../util/app-util';
import image from '../../assets/imgs/EZ.png';

const c = className => STYLES[className] || 'UNKNOWN';

const Record = ({ record }) => (
  <div className={c('App_record')}>
    <img className={c('App_icon')} alt="icon" src={image} />
    <div className={c('App_record_depature')}>
      <span className={c('App_record_depature_time')}>
        {formatTime(record.departureDateTime)}
      </span>
      <span className={c('App_record_sec-tex')}>
        {record.originStation.code}
      </span>
    </div>
    <div className={c('App_record_stop')}>
      <BpkLongArrowRight className={c('App_record_arrow-right')} />
    </div>
    <div className={c('App_record_arrival')}>
      <span className={c('App_record_depature_time')}>
        {formatTime(record.arrivalDateTime)}
      </span>
      <span className={c('App_record_sec-tex')}>
        {record.destinationStation.code}
      </span>
    </div>
    <div className={c('App_record_summary')}>
      <span className={c('App_record_summary_duration')}>
        {getDuration(record.duration)}
      </span>
      {record.stops && record.stops.length ? (
        <span className={c('App_record_summary_red')}>
          {record.stops.length} Stop(s)
        </span>
      ) : (
        <span className={c('App_record_summary_green')}>Direct</span>
      )}
    </div>
  </div>
);

Record.propTypes = {
  record: PropTypes.instanceOf(Object).isRequired
};

export default Record;
