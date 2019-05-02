import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLists } from '../../actions';

export class ListAll extends React.Component {
  componentDidMount() {
    this.props.fetchLists();
  }

  renderEditDelete(list) {
    if (list.userid === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/list/edit/${list.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`list/delete/${list.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  };

  renderLists() {
    return this.props.lists.map(list => {
      return(
        <div className="item" key={list.id} >
          {this.renderEditDelete(list)}
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

  renderCreate() {
    if (this.props.isSignedIn) {
      return(
        <div style={{ textAlign: 'right' }}>
          <Link to="list/new" className="ui button primary">
            Create New Movie List
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Movie Lists:</h2>
        <div className="ui celled list">{this.renderLists()}</div>
        {this.renderCreate()}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    lists: Object.values(state.list.lists),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { fetchLists })(ListAll);
