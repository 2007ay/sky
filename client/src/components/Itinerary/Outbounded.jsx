import React from 'react';
import PropTypes from 'prop-types';
import Record from './Record';

const Outbounded = ({ record }) => (
  <Record record={record} />
);

Outbounded.propTypes = {
  record: PropTypes.instanceOf(Object).isRequired,
};

export default Outbounded;
