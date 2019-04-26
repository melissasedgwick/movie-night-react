import React from 'react';
import { shallow } from 'enzyme';
import { ListAll } from './';

describe('<ListAll />', () => {
  const fetchLists = jest.fn();

  const props = {
    lists: [],
    fetchLists
  }

  const propsWithLists = {
    lists: [{
      id: 1,
      title: 'Horror Movies',
      userId: 1
    },
    {
      id: 2,
      title: 'Action Movies',
      userId: 1
    }],
    fetchLists
  }

  it('should render', () => {
    const wrapper = shallow(<ListAll {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  describe('componentDidMount', () => {
    it('should call fetchLists', () => {
      const wrapper = shallow(<ListAll {...props} />);
      wrapper.instance().componentDidMount();

      expect(fetchLists).toHaveBeenCalled();
    });
  });

  describe('renderLists', () => {
    describe('when there are no lists', () => {
      it('should return an empty array', () => {
        const wrapper = shallow(<ListAll {...props} />);
        const result = wrapper.instance().renderLists();

        expect(result).toEqual([]);
      });
    });

    describe('when there are lists', () => {
      it('should return a div for each list', () => {
        const wrapper = shallow(<ListAll {...propsWithLists} />);
        const result = wrapper.instance().renderLists();

        expect(result.length).toEqual(2);
        expect(result[0].type).toEqual('div');
        expect(result[1].type).toEqual('div');
      });

      it('should return an icon within each div', () => {
        const wrapper = shallow(<ListAll {...propsWithLists} />);
        const result = wrapper.instance().renderLists();

        const firstDivChildren = result[0].props.children;
        const secondDivChildren = result[1].props.children;

        expect(firstDivChildren[0].type).toEqual('i');
        expect(secondDivChildren[0].type).toEqual('i');
      });

      it('should render the title for each list', () => {
        const wrapper = shallow(<ListAll {...propsWithLists} />);
        const result = wrapper.instance().renderLists();

        const firstLink = result[0].props.children[1].props.children;
        const secondLink = result[1].props.children[1].props.children;

        expect(firstLink.props.children).toEqual('Horror Movies');
        expect(secondLink.props.children).toEqual('Action Movies');
      });

      it('should render the a link to the indidual lists', () => {
        const wrapper = shallow(<ListAll {...propsWithLists} />);
        const result = wrapper.instance().renderLists();

        const firstLink = result[0].props.children[1].props.children;
        const secondLink = result[1].props.children[1].props.children;

        expect(firstLink.props.to).toEqual('list/1');
        expect(secondLink.props.to).toEqual('list/2');
      });
    });
  });

  describe('render', () => {
    it('should render a header with the correct text', () => {
      const wrapper = shallow(<ListAll {...props} />);
      const header = wrapper.find('h2');

      expect(header.length).toEqual(1);
      expect(header.text()).toEqual('Movie Lists:');
    });

    it('should call renderLists', () => {
      const renderLists = jest.fn();
      const wrapper = shallow(<ListAll {...props} />);

      wrapper.instance().renderLists = renderLists;
      wrapper.instance().render();

      expect(renderLists).toHaveBeenCalled();
    });
  });
});
