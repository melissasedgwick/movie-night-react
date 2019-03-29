import React from 'react';
import { mount } from 'enzyme';
import ListDelete from './';

describe('<ListDelete />', () => {
  it('should render', () => {
    const wrapper = mount(<ListDelete />);

    expect(wrapper.length).toEqual(1);
  });
});
