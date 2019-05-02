import React from 'react';
import { shallow } from 'enzyme';
import { ListEdit } from './';

describe('<ListEdit />', () => {
  const fetchList = jest.fn();

  const props = {
    fetchList,
    match: { params: { id: 1 } }
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
    it('should render a header with the text `Edit List`', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const header = wrapper.find('h2');

      expect(header.length).toEqual(1);
      expect(header.text()).toEqual('Edit List');
    });

    it('should render a ReduxForm with an onSubmit prop', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const reduxForm = wrapper.find('ReduxForm');

      expect(reduxForm.length).toEqual(1);
      expect(reduxForm.props().onSubmit).toBeInstanceOf(Function);
    });
  });
});
