import React from 'react';
import { shallow } from 'enzyme';
import { ListDelete } from './';

describe('<ListDelete />', () => {
  const fetchList = jest.fn();
  const deleteList = jest.fn();

  const props = {
    fetchList,
    deleteList,
    match: { params: { id: 1 } }
  }

  it('should render', () => {
    const wrapper = shallow(<ListDelete {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  describe('componentDidMount', () => {
    it('should call fetchList with id', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      wrapper.instance().componentDidMount();

      expect(fetchList).toHaveBeenCalledWith(1);
    });
  });

  describe('renderContent', () => {
    describe('when list has not been loaded', () => {
      it('should return text without title', () => {
        const wrapper = shallow(<ListDelete {...props} />);
        const result = wrapper.instance().renderContent();

        expect(result).toEqual('Are you sure you want to delete this list?');
      });
    });

    describe('when the list has been loaded', () => {
      it('should return text with the title', () => {
        const list = { title: 'Movie List Title' };

        const wrapper = shallow(<ListDelete {...props} list={list} />);
        const result = wrapper.instance().renderContent();

        expect(result).toEqual('Are you sure you want to delete this list: Movie List Title?');
      });
    });
  });

  describe('renderActions', () => {
    it('should render a Delete button', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      const result = wrapper.instance().renderActions().props.children;
      const button = result[0];

      expect(button.type).toEqual('button');
      expect(button.props.children).toEqual('Delete');
    });

    it('Delete button should call deleteList with id onClick', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      const result = wrapper.instance().renderActions().props.children;
      const button = result[0];

      button.props.onClick();

      expect(deleteList).toHaveBeenCalledWith(1);
    });

    it('should render a Cancel Link', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      const result = wrapper.instance().renderActions().props.children;
      const link = result[1];

      expect(link.props.to).toEqual('/');
      expect(link.props.children).toEqual('Cancel');
    });
  });

  describe('render', () => {
    it('should render a Modal', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      const modal = wrapper.find('Modal');

      expect(modal.length).toEqual(1);
    });

    it('Modal should have correct title prop', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      const modal = wrapper.find('Modal');

      expect(modal.props().title).toEqual('Delete List');
    });

    it('Modal should have correct content prop', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      const renderContent = wrapper.instance().renderContent();

      const modal = wrapper.find('Modal');

      expect(JSON.stringify(modal.props().content)).toEqual(JSON.stringify(renderContent));
    });

    it('Modal should have correct actions prop', () => {
      const wrapper = shallow(<ListDelete {...props} />);
      const renderActions = wrapper.instance().renderActions();

      const modal = wrapper.find('Modal');

      expect(JSON.stringify(modal.props().actions)).toEqual(JSON.stringify(renderActions));
    });

    it('Modal should have an onDismiss prop', () => {
      const wrapper = shallow(<ListDelete {...props} />);

      const modal = wrapper.find('Modal');

      expect(modal.props().onDismiss).toBeInstanceOf(Function);
    });
  });
});
