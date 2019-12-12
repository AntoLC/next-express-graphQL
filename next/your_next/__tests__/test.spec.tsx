import * as React from 'react';
import {mount} from 'enzyme';
import TestComponent from '../components/test';

describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', function () {
      const wrap = mount(<TestComponent/>)
      expect(wrap.find('div').text()).toBe('Hello Next.js')
    })
  })  
});