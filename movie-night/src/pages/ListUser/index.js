import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserLists } from '../../actions';

export class ListUser extends React.Component {
  componentDidMount() {
    this.props.fetchUserLists(this.props.match.params.userid);
  }

  renderLists() {
    return this.props.lists.map(list => {
      return(
        <div className="item" key={list.id} >
          <i className="large middle aligned icon film" />
          <div className="content">
            <Link to={`/list/${list.id}`} className="header">
              {list.title}
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.lists) {
      return <div>Loading...</div>
    }

    const { username } = this.props.lists[0];

    return (
      <div>
        <h2 className="ui centre aligned icon header">{username}'s Lists</h2>
        <div className="ui celled list">{this.renderLists()}</div>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    lists: state.list[ownProps.match.params.userid]
  }
}

export default connect(mapStateToProps, { fetchUserLists })(ListUser);
