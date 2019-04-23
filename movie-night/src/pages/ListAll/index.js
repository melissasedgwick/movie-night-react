import React from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../../actions';

class ListAll extends React.Component {
  componentDidMount() {
    this.props.fetchLists();
  }

  renderLists() {
    return this.props.lists[0].map(list => {
      return(
        <div className="item" key={list.id} >
          <i className="large middle aligned icon film" />
          <div className="content">
            {list.title}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>ListAll</h2>
        <div className="ui celled list">{this.renderLists()}</div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { lists: Object.values(state.list) };
}

export default connect(mapStateToProps, { fetchLists })(ListAll);
