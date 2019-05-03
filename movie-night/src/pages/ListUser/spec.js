import React from 'react';
import { shallow } from 'enzyme';
import { ListUser } from './';

describe('<ListUser />', () => {
  const fetchUserLists = jest.fn();

  const props = {
    fetchUserLists,
    match: { params: { userid: 1} }
  }

  const propsWithLists = {
    lists: [{
      id: 1,
      title: 'Horror Movies',
      userid: 1,
      username: 'Test User'
    },
    {
      id: 2,
      title: 'Action Movies',
      userid: 1,
      username: 'Test User'
    }],
    fetchUserLists,
    match: { params: { userid: 1} }
  }

  it('should render', () => {
    const wrapper = shallow(<ListUser {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  describe('componentDidMount', () => {
    it('should call fetchUserLists with userid', () => {
      const wrapper = shallow(<ListUser {...props} />);
      wrapper.instance().componentDidMount();

      expect(fetchUserLists).toHaveBeenCalledWith(1);
    });
  });

  describe('renderLists', () => {
    it('should return a div for each list', () => {
      const wrapper = shallow(<ListUser {...propsWithLists} />);
      const result = wrapper.instance().renderLists();

      expect(result.length).toEqual(2);
      expect(result[0].type).toEqual('div');
      expect(result[1].type).toEqual('div');
    });

    it('should return an icon within each div', () => {
      const wrapper = shallow(<ListUser {...propsWithLists} />);
      const result = wrapper.instance().renderLists();

      const firstDivChildren = result[0].props.children;
      const secondDivChildren = result[1].props.children;

      expect(firstDivChildren[0].type).toEqual('i');
      expect(secondDivChildren[0].type).toEqual('i');
    });

    it('should render the title for each list', () => {
      const wrapper = shallow(<ListUser {...propsWithLists} />);
      const result = wrapper.instance().renderLists();

      const firstLink = result[0].props.children[1].props.children;
      const secondLink = result[1].props.children[1].props.children;

      expect(firstLink.props.children).toEqual('Horror Movies');
      expect(secondLink.props.children).toEqual('Action Movies');
    });

    it('should render the a link to the indidual lists', () => {
      const wrapper = shallow(<ListUser {...propsWithLists} />);
      const result = wrapper.instance().renderLists();

      const firstLink = result[0].props.children[1].props.children;
      const secondLink = result[1].props.children[1].props.children;

      expect(firstLink.props.to).toEqual('/list/1');
      expect(secondLink.props.to).toEqual('/list/2');
    });
  });

  describe('render', () => {
    describe('when there are no lists', () => {
      it('should render a div with the text `Loading...`', () => {
        const wrapper = shallow(<ListUser {...props} />);
        const div = wrapper.find('div');

        expect(div.length).toEqual(1);
        expect(div.text()).toEqual('Loading...');
      });
    });

    describe('when there are lists', () => {
      it('should render a header with the user\'s name', () => {
        const wrapper = shallow(<ListUser {...propsWithLists} />);
        const header = wrapper.find('h2');

        expect(header.length).toEqual(1);
        expect(header.text()).toEqual('Test User\'s Lists');
      });

      it('should call renderLists', () => {
        const renderLists = jest.fn();
        const wrapper = shallow(<ListUser {...propsWithLists} />);

        wrapper.instance().renderLists = renderLists;
        wrapper.instance().render();

        expect(renderLists).toHaveBeenCalled();
      });
    });
  });
});
