import React from 'react';
import TestRenderer from 'react-test-renderer';

import Record from './Record';

describe('Record', () => {
  it('should render correctly', () => {
    const tree = TestRenderer.create(<Record />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
