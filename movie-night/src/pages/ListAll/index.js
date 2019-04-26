import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLists } from '../../actions';

export class ListAll extends React.Component {
  componentDidMount() {
    this.props.fetchLists();
  }

  renderLists() {
    return this.props.lists.map(list => {
      return(
        <div className="item" key={list.id} >
          <i className="large middle aligned icon film" />
          <div className="content">
            <Link to={`list/${list.id}`} className="header">
              {list.title}
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Movie Lists:</h2>
        <div className="ui celled list">{this.renderLists()}</div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { lists: Object.values(state.list.lists) };
}

export default connect(mapStateToProps, { fetchLists })(ListAll);
