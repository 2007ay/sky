import React from 'react';
import PropTypes from 'prop-types';
import Record from './Record';

const Inbounded = ({ record }) => <Record record={record} />;

Inbounded.propTypes = {
  record: PropTypes.instanceOf(Object).isRequired,
};

export default Inbounded;
