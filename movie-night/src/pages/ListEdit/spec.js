import React from 'react';
import { shallow } from 'enzyme';
import { ListEdit } from './';

describe('<ListEdit />', () => {
  const handleSubmit = jest.fn();
  const fetchList = jest.fn();

  const props = {
    handleSubmit,
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

  describe('renderError', () => {
    it('should return an error message when touched and error are true', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const { renderError } = wrapper.instance();

      const result = renderError({ error: 'test error', touched: true }).props.children

      expect(result.type).toEqual('div');
      expect(result.props.children).toEqual('test error');
    });

    it('should return null when touched is false', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const { renderError } = wrapper.instance();

      const result = renderError({ error: 'test error', touched: false });

      expect(result).toEqual(null);
    });

    it('should return null when there is no error', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const { renderError } = wrapper.instance();

      const result = renderError({ touched: true });

      expect(result).toEqual(null);
    });
  });

  describe('renderInput', () => {
    const input = { name: 'title', value: 'text' };
    const label = 'title';
    const meta = { touched: true };

    it('should return a label with the correct text', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const { renderInput } = wrapper.instance();

      const result = renderInput({input, label, meta}).props.children;

      expect(result[0].type).toEqual('label');
      expect(result[0].props.children).toEqual('title');
    });

    it('should return an input with the correct name and value', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const { renderInput } = wrapper.instance();

      const result = renderInput({input, label, meta}).props.children;

      expect(result[1].type).toEqual('input');
      expect(result[1].props.name).toEqual('title');
      expect(result[1].props.value).toEqual('text');
    });

    it('should call renderError', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const { renderInput } = wrapper.instance();
      const renderError = jest.spyOn(wrapper.instance(), 'renderError');

      renderInput({input, label, meta});

      expect(renderError).toHaveBeenCalledWith(meta);
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

    it('should render a form', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const form = wrapper.find('form');

      expect(form.length).toEqual(1);
    });

    it('form should render one Field with the correct label', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const form = wrapper.find('form');
      const field = form.find('Field');

      expect(field.length).toEqual(1);
      expect(field.props().label).toEqual('Title:');
    });

    it('form should render one button with the correct text', () => {
      const wrapper = shallow(<ListEdit {...props} />);
      const form = wrapper.find('form');
      const button = form.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('Submit Changes');
    });
  });
});
