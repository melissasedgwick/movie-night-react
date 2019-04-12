import React from 'react';
import { shallow } from 'enzyme';
import { GoogleAuth } from './';

describe.only('<GoogleAuth />', () => {
  const load = jest.fn();

  window['gapi'] = {
    load
  }

  it('should render', () => {
    const wrapper = shallow(<GoogleAuth />);

    expect(wrapper.length).toEqual(1);
  });

  describe('componentDidMount', () => {
    it('should be a function', () => {
      const wrapper = shallow(<GoogleAuth />);

      expect(wrapper.instance().componentDidMount).toBeInstanceOf(Function);
    });

    it('should call window.gapi.load', () => {
      const wrapper = shallow(<GoogleAuth />);
      wrapper.instance().componentDidMount();

      expect(load).toHaveBeenCalled();
    });
  });

  describe('onAuthChange', () => {
    it('should be a function', () => {
      const wrapper = shallow(<GoogleAuth />);

      expect(wrapper.instance().onAuthChange).toBeInstanceOf(Function);
    });

    it('should call signIn if isSignedIn', () => {
      const signIn = jest.fn();
      const wrapper = shallow(<GoogleAuth signIn={signIn} />);
      wrapper.instance().onAuthChange(true);

      expect(signIn).toHaveBeenCalled();
    });

    it('should call signOut if not isSignedIn', () => {
      const signOut = jest.fn();
      const wrapper = shallow(<GoogleAuth signOut={signOut} />);
      wrapper.instance().onAuthChange(false);

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe('onSignInClick', () => {
    it('should be a function', () => {
      const wrapper = shallow(<GoogleAuth />);

      expect(wrapper.instance().onSignInClick).toBeInstanceOf(Function);
    });
  });

  describe('onSignOutClick', () => {
    it('should be a function', () => {
      const wrapper = shallow(<GoogleAuth />);

      expect(wrapper.instance().onSignOutClick).toBeInstanceOf(Function);
    });
  });

  describe('when signed in', () => {
    it('should render a Sign Out button', () => {
      const wrapper = shallow(<GoogleAuth isSignedIn={true} />);
      const button = wrapper.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('Sign Out');
    });
  });

  describe('when signed out', () => {
    it('should render a Sign In button', () => {
      const wrapper = shallow(<GoogleAuth isSignedIn={false} />);
      const button = wrapper.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('Sign In');
    });
  });

  describe('when there is no isSignedIn prop', () => {
    it('should not render a button', () => {
      const wrapper = shallow(<GoogleAuth />);
      const button = wrapper.find('button');

      expect(button.length).toEqual(0);
    });
  });
});
