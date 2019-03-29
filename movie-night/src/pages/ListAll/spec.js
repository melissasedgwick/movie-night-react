import React from 'react';
import { mount } from 'enzyme';
import ListAll from './';

describe('<ListAll />', () => {
  it('should render', () => {
    const wrapper = mount(<ListAll />);

    expect(wrapper.length).toEqual(1);
  });
});
