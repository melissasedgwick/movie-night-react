import React from 'react';
import { mount } from 'enzyme';
import ListCreate from './';

describe('<ListCreate />', () => {
  it('should render', () => {
    const wrapper = mount(<ListCreate />);

    expect(wrapper.length).toEqual(1);
  });
});
