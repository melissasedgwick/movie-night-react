import React from 'react';
import { shallow } from 'enzyme';
import { ListForm } from './';

describe('<ListForm />', () => {
  const onSubmit = jest.fn();
  const handleSubmit = jest.fn();

  const props = {
    onSubmit,
    handleSubmit
  }

  it('should render', () => {
    const wrapper = shallow(<ListForm {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  describe('renderError', () => {
    it('should be a function', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderError } = wrapper.instance();

      expect(renderError).toBeInstanceOf(Function);
    });

    it('should return an error message when touched and error are true', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderError } = wrapper.instance();

      const result = renderError({ error: 'test error', touched: true }).props.children

      expect(result.type).toEqual('div');
      expect(result.props.children).toEqual('test error');
    });

    it('should return null when touched is false', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderError } = wrapper.instance();

      const result = renderError({ error: 'test error', touched: false });

      expect(result).toEqual(null);
    });

    it('should return null when there is no error', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderError } = wrapper.instance();

      const result = renderError({ touched: true });

      expect(result).toEqual(null);
    });
  });

  describe('renderInput', () => {
    const input = { name: 'title', value: 'text' };
    const label = 'title';
    const meta = { touched: true };

    it('should be a function', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderInput } = wrapper.instance();

      expect(renderInput).toBeInstanceOf(Function);
    });

    it('should return a label with the correct text', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderInput } = wrapper.instance();

      const result = renderInput({input, label, meta}).props.children;

      expect(result[0].type).toEqual('label');
      expect(result[0].props.children).toEqual('title');
    });

    it('should return an input with the correct name and value', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderInput } = wrapper.instance();

      const result = renderInput({input, label, meta}).props.children;

      expect(result[1].type).toEqual('input');
      expect(result[1].props.name).toEqual('title');
      expect(result[1].props.value).toEqual('text');
    });

    it('should call renderError', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { renderInput } = wrapper.instance();
      const renderError = jest.spyOn(wrapper.instance(), 'renderError');

      renderInput({input, label, meta});

      expect(renderError).toHaveBeenCalledWith(meta);
    });
  });

  describe('onSubmit', () => {
    it('should be a function', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const { onSubmit } = wrapper.instance();

      expect(onSubmit).toBeInstanceOf(Function);
    });

    it('should call onSubmit from props with the formValues', () => {
      const formValues = { title: 'Movie List' };

      const wrapper = shallow(<ListForm {...props} />);
      wrapper.instance().onSubmit(formValues);

      expect(onSubmit).toHaveBeenCalledWith(formValues);
    });
  });

  describe('render', () => {
    it('should render a form', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const form = wrapper.find('form');

      expect(form.length).toEqual(1);
    });

    it('should render one Field with the correct label', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const form = wrapper.find('form');
      const field = form.find('Field');

      expect(field.length).toEqual(1);
      expect(field.props().label).toEqual('Title:');
    });

    it('should render one button with the correct text', () => {
      const wrapper = shallow(<ListForm {...props} />);
      const form = wrapper.find('form');
      const button = form.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('Submit');
    });
  });
});
