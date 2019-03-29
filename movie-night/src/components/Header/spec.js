import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import Header from './';

describe('<Header />', () => {
  it('should render', () => {
    const wrapper = mount(<BrowserRouter><Header /></BrowserRouter>);

    expect(wrapper.length).toEqual(1);
  });

  it('should render a link to the home page called `Movie Night`', () => {
    const wrapper = mount(<BrowserRouter><Header /></BrowserRouter>);
    const movieNightLink = wrapper.find('Link[id="movie-night-link"]');

    expect(movieNightLink.length).toEqual(1);
  });

  it('should render a link to the home page called `All Movie Lists`', () => {
    const wrapper = mount(<BrowserRouter><Header /></BrowserRouter>);
    const movieNightLink = wrapper.find('Link[id="all-lists-link"]');

    expect(movieNightLink.length).toEqual(1);

  });
});
