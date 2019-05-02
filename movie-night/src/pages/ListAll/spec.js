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
      userid: 1
    },
    {
      id: 2,
      title: 'Action Movies',
      userid: 1
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

  describe('renderEditDelete', () => {
    const [list] = propsWithLists.lists;

    describe('when the logged in user does not match the list userId', () => {
      it('should return undefined', () => {
        const wrapper = shallow(<ListAll {...props} currentUserId={3} />);
        const result = wrapper.instance().renderEditDelete(list);

        expect(result).toEqual(undefined);
      });
    });

    describe('when the logged in user matches the list userId', () => {
      it('should render an `Edit` Link', () => {
        const wrapper = shallow(<ListAll {...props} currentUserId={1} />);
        const result = wrapper.instance().renderEditDelete(list);
        const link = result.props.children[0];

        expect(link.props.children).toEqual('Edit');
      });

      it('should render a `Delete` Link', () => {
        const wrapper = shallow(<ListAll {...props} currentUserId={1} />);
        const result = wrapper.instance().renderEditDelete(list);
        const link = result.props.children[1];

        expect(link.props.children).toEqual('Delete');
      });
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

        expect(firstDivChildren[1].type).toEqual('i');
        expect(secondDivChildren[1].type).toEqual('i');
      });

      it('should render the title for each list', () => {
        const wrapper = shallow(<ListAll {...propsWithLists} />);
        const result = wrapper.instance().renderLists();

        const firstLink = result[0].props.children[2].props.children;
        const secondLink = result[1].props.children[2].props.children;

        expect(firstLink.props.children).toEqual('Horror Movies');
        expect(secondLink.props.children).toEqual('Action Movies');
      });

      it('should render the a link to the indidual lists', () => {
        const wrapper = shallow(<ListAll {...propsWithLists} />);
        const result = wrapper.instance().renderLists();

        const firstLink = result[0].props.children[2].props.children;
        const secondLink = result[1].props.children[2].props.children;

        expect(firstLink.props.to).toEqual('list/1');
        expect(secondLink.props.to).toEqual('list/2');
      });

      it('should call renderEditDelete for each list', () => {
        const renderEditDelete = jest.fn();
        const wrapper = shallow(<ListAll {...propsWithLists} />);

        wrapper.instance().renderEditDelete = renderEditDelete;
        wrapper.instance().renderLists();

        expect(renderEditDelete).toHaveBeenCalledTimes(2);

      });
    });
  });

  describe('renderCreate', () => {
    describe('when user is not signed in', () => {
      it('should return undefined', () => {
        const wrapper = shallow(<ListAll {...props} isSignedIn={false} />);
        const result = wrapper.instance().renderCreate();

        expect(result).toEqual(undefined);
      });
    });

    describe('when user is signed in', () => {
      it('should render a `Create New Movie List` Link', () => {
        const wrapper = shallow(<ListAll {...props} isSignedIn={true} />);
        const result = wrapper.instance().renderCreate();
        const link = result.props.children;

        expect(link.props.to).toEqual('list/new');
        expect(link.props.children).toEqual('Create New Movie List');
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

    it('should call renderCreate', () => {
      const renderCreate = jest.fn();
      const wrapper = shallow(<ListAll {...props} />);

      wrapper.instance().renderCreate = renderCreate;
      wrapper.instance().render();

      expect(renderCreate).toHaveBeenCalled();
    });
  });
});
