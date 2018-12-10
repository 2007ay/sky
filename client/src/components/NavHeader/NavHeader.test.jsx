import React from 'react';
import TestRenderer from 'react-test-renderer';

import NavHeader from './NavHeader';

describe('NavHeader', () => {
  it('should render correctly', () => {
    const tree = TestRenderer.create(<NavHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
