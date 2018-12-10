import moment from 'moment';

export const formatTime = time => moment(time).format('HH:MM');
export const getDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const mins = duration % 60;
  return `${hours}h ${mins}`;
};

export const apiHost = 'http://localhost:4000';
export const generateKey = pre => `${pre}_${new Date().getTime()}`;

export const getFormattedCurrency = function (value, loc, curr) {
  return Number(value).toLocaleString(loc, {
    style: 'currency',
    currency: curr,
    minimumFractionDigits: 0,
  });
};


export const queryParams = {
  country: 'UK',
  currency: 'GBP',
  locale: 'en-GB',
  locationSchema: 'Sky',
  originplace: 'EDI',
  outbounddate: '2018-12-07',
  inbounddate: '2018-12-07',
  destinationplace: 'LHR',
};
