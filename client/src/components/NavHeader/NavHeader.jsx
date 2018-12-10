import React from 'react';
import BpkSmallPriceIcon from 'bpk-component-icon/lg/price-alerts';

import STYLES from './NavHeader.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const NavHeader = () => (
  <div className={c('NavHeader')}>
    <span> Filter</span>
    <span> Sort</span>
    <span>
      <BpkSmallPriceIcon className={c('NavHeader_price-alerts')} />
      <span>Price alerts</span>
    </span>
  </div>
);

export default NavHeader;
