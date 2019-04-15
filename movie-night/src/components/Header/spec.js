import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('<Header />', () => {
  it('should render', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.length).toEqual(1);
  });

  it('should render a link to the home page called `Movie Night`', () => {
    const wrapper = shallow(<Header />);
    const movieNightLink = wrapper.find('Link[id="movie-night-link"]');

    expect(movieNightLink.length).toEqual(1);
  });

  it('should render a link to the home page called `All Movie Lists`', () => {
    const wrapper = shallow(<Header />);
    const movieNightLink = wrapper.find('Link[id="all-lists-link"]');

    expect(movieNightLink.length).toEqual(1);

  });

  it('should render a GoogleAuth component', () => {
    const wrapper = shallow(<Header />);
    const googleAuth = wrapper.find('Connect(GoogleAuth)');

    expect(googleAuth.length).toEqual(1);
  });
});
