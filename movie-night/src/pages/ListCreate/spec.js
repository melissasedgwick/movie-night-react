import React from 'react';
import { shallow } from 'enzyme';
import { ListCreate } from './';

describe('<ListCreate />', () => {
  it('should render', () => {
    const wrapper = shallow(<ListCreate />);

    expect(wrapper.length).toEqual(1);
  });

  describe('onSubmit', () => {
    it('should be a function', () => {
      const wrapper = shallow(<ListCreate />);
      const { onSubmit } = wrapper.instance();

      expect(onSubmit).toBeInstanceOf(Function);
    });

    it('should call createList with the formValues', () => {
      const createList = jest.fn();
      const formValues = { title: 'Movie List' };

      const wrapper = shallow(<ListCreate createList={createList} />);
      wrapper.instance().onSubmit(formValues);

      expect(createList).toHaveBeenCalledWith(formValues);
    });
  });

  describe('render', () => {
    it('should render a header with the correct text', () => {
      const wrapper = shallow(<ListCreate />);
      const header = wrapper.find('h2');

      expect(header.length).toEqual(1);
      expect(header.text()).toEqual('Create a new movie list!');
    });

    it('should render a ReduxForm with an onSubmit prop', () => {
      const wrapper = shallow(<ListCreate />);
      const reduxForm = wrapper.find('ReduxForm');

      expect(reduxForm.length).toEqual(1);
      expect(reduxForm.props().onSubmit).toBeInstanceOf(Function);
    });

  });
});
