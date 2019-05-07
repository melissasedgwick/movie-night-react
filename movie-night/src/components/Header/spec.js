import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('<Header />', () => {
  it('should render', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.length).toEqual(1);
  });

  it('should render the clapperboard image', () => {
    const wrapper = shallow(<Header />);
    const image = wrapper.find('img');

    expect(image.length).toEqual(1);
    expect(image.props().src).toEqual('clapperboard.png');
    expect(image.props().alt).toEqual('clapper board');
  });

  it('should render a link to the home page called `Movie Night`', () => {
    const wrapper = shallow(<Header />);
    const movieNightLink = wrapper.find('Link[id="movie-night-link"]');

    expect(movieNightLink.length).toEqual(1);
    expect(movieNightLink.find('h2').text()).toEqual('Movie Night');
  });

  it('should render a link to the home page called `All Movie Lists`', () => {
    const wrapper = shallow(<Header />);
    const movieNightLink = wrapper.find('Link[id="all-lists-link"]');

    expect(movieNightLink.length).toEqual(1);
    expect(movieNightLink.find('h2').text()).toEqual('All Movie Lists');
  });

  it('should render a GoogleAuth component', () => {
    const wrapper = shallow(<Header />);
    const googleAuth = wrapper.find('Connect(GoogleAuth)');

    expect(googleAuth.length).toEqual(1);
  });
});
