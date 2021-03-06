import React from 'react';
import BpkText from 'bpk-component-text';
import BpkLongArrowRight from 'bpk-component-icon/lg/long-arrow-right';

import { queryParams } from '../../util/app-util';

import STYLES from './SearchSummary.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const SearchSummary = () => (
  <div className={c('SearchSummary')}>
    <BpkText tagName="p" textStyle="xl" className={c('SearchSummary_source')}>
      {queryParams.originplace}
    </BpkText>
    <BpkLongArrowRight className={c('SearchSummary_arrow-right')} />
    <BpkText
      tagName="p"
      textStyle="xl"
      className={c('SearchSummary_destination')}
    >
      {queryParams.destinationplace}
    </BpkText>
    <BpkText tagName="p" textStyle="sm" className={c('SearchSummary_info')}>
      1 travellers, economy
    </BpkText>
  </div>
);

export default SearchSummary;
