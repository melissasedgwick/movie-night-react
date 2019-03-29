import React from 'react';
import { mount } from 'enzyme';
import ListIndividual from './';

describe('<ListIndividual />', () => {
  it('should render', () => {
    const wrapper = mount(<ListIndividual />);

    expect(wrapper.length).toEqual(1);
  });
});
