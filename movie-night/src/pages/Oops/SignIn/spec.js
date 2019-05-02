import React from 'react';
import { shallow } from 'enzyme';
import history from '../../../history';
import { OopsSignIn } from './';

describe('<OopsSignIn />', () => {
  it('should render', () => {
    const wrapper = shallow(<OopsSignIn />);

    expect(wrapper.length).toEqual(1);
  });

  describe('render', () => {
    describe('when signed in', () => {
      it('should take user back to previous page', () => {
        const historySpy = jest.spyOn(history, 'goBack');
        shallow(<OopsSignIn isSignedIn={true} />);

        expect(historySpy).toHaveBeenCalled();
      });
    });

    describe('when not signed in', () => {
      it('should render a h2 with correct text', () => {
        const wrapper = shallow(<OopsSignIn isSignedIn={false} />);
        const h2 = wrapper.find('h2');

        expect(h2.length).toEqual(1);
        expect(h2.text()).toEqual('Oops! You need to be signed in to view this page!');
      });

      it('should render a h3 with the text `Please sign in:`', () => {
        const wrapper = shallow(<OopsSignIn isSignedIn={false} />);
        const h3 = wrapper.find('h3');

        expect(h3.at(0).text()).toEqual('Please sign in:');
      });

      it('should render a GoogleAuth component', () => {
        const wrapper = shallow(<OopsSignIn isSignedIn={false} />);
        const googleAuth = wrapper.find('Connect(GoogleAuth)');

        expect(googleAuth.length).toEqual(1);
      });

      it('should render a h3 with the text `Or return to the home page:`', () => {
        const wrapper = shallow(<OopsSignIn isSignedIn={false} />);
        const h3 = wrapper.find('h3');

        expect(h3.at(1).text()).toEqual('Or return to the home page:');
      });

      it('should render a Link to the homepage', () => {
        const wrapper = shallow(<OopsSignIn isSignedIn={false} />);
        const link = wrapper.find('Link');

        expect(link.length).toEqual(1);
        expect(link.props().to).toEqual('/');
        expect(link.props().children).toEqual('All Movie Lists');
      });
    });
  });
});
