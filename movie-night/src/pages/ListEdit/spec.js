import React from 'react';
import { shallow } from 'enzyme';
import history from '../../history';
import { ListEdit } from './';

describe('<ListEdit />', () => {
  const fetchList = jest.fn();

  const props = {
    fetchList,
    match: { params: { id: 1 } },
    isSignedIn: true
  }

  const propsNotSignedIn = {
    fetchList,
    match: { params: { id: 1 } },
    isSignedIn: false
  }

  it('should render', () => {
    const wrapper = shallow(<ListEdit {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  describe('componentDidMount', () => {
    it('should call fetchList with correct parameter', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      wrapper.instance().componentDidMount();

      expect(fetchList).toHaveBeenCalledWith(1);
    });
  });

  describe('onSubmit', () => {
    it('should call editList with the id and formValues', () => {
      const editList = jest.fn();
      const formValues = { title: 'Movie List' };

      const wrapper = shallow(<ListEdit {...props} editList={editList} />);
      wrapper.instance().onSubmit(formValues);

      expect(editList).toHaveBeenCalledWith(1, formValues);
    });
  });

  describe('render', () => {
    describe('when signed in', () => {
      it('should render a header with the text `Edit List`', () => {
        const wrapper = shallow(<ListEdit {...props} />);
        const header = wrapper.find('h2');

        expect(header.length).toEqual(1);
        expect(header.text()).toEqual('Edit List');
      });

      it('should render a ReduxForm with an onSubmit and initialValues prop', () => {
        const list = { title: 'Movie List Title' }

        const wrapper = shallow(<ListEdit {...props} list={list} />);
        const reduxForm = wrapper.find('ReduxForm');
        const { onSubmit } = wrapper.instance();

        expect(reduxForm.length).toEqual(1);
        expect(reduxForm.props().onSubmit).toEqual(onSubmit);
        expect(reduxForm.props().initialValues).toEqual(list);
      });
    });

    describe('when not signed in', () => {
      it('should take user to the oops/signIn page', () => {
        const historySpy = jest.spyOn(history, 'push');
        shallow(<ListEdit {...propsNotSignedIn} />);

        expect(historySpy).toHaveBeenCalledWith('/oops/signIn');
      });
    });
  });
});
