import React from 'react';
import { mount } from 'enzyme';
import ListEdit from './';

describe('<ListEdit />', () => {
  it('should render', () => {
    const wrapper = mount(<ListEdit />);

    expect(wrapper.length).toEqual(1);
  });
});
