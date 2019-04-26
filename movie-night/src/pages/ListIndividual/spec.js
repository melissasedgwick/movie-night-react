import React from 'react';
import { shallow } from 'enzyme';
import { ListIndividual } from './';

describe('<ListIndividual />', () => {
  const fetchList = jest.fn();

  const props = {
    fetchList,
    match: { params: { id: 1 } }
  }

  it('should render', () => {
    const wrapper = shallow(<ListIndividual {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  describe('componentDidMount', () => {
    it('calls fetchList with correct parameter', () => {
      const wrapper = shallow(<ListIndividual {...props} />);
      wrapper.instance().componentDidMount();

      expect(fetchList).toHaveBeenCalledWith(1);
    });
  });

  describe('render', () => {
    it('renders a div with the text `Loading...` when there is no list', () => {
      const wrapper = shallow(<ListIndividual {...props} />);
      const div = wrapper.find('div');

      expect(div.length).toEqual(1);
      expect(div.text()).toEqual('Loading...');
    });

    it('renders the title when there is a list', () => {
      const list = { title: 'A Movie List' };
      const wrapper = shallow(<ListIndividual {...props} list={list} />);
      const header = wrapper.find('h2');

      expect(header.length).toEqual(1);
      expect(header.text()).toEqual('A Movie List');
    });
  });
});
