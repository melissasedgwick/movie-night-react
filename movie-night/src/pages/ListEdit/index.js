import React from 'react';
import { connect } from 'react-redux';
import { fetchList, editList } from '../../actions';
import history from '../../history';
import ListForm from '../../components/ListForm/';

export class ListEdit extends React.Component {
  componentDidMount() {
    if (!this.props.isSignedIn) {
      history.push('/oops/signIn');
    }
    
    this.props.fetchList(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editList(this.props.match.params.id, formValues);
  }

  render() {
    return (
      <div>
        <h2 className="ui centre aligned icon header">Edit List</h2>
        <ListForm onSubmit={this.onSubmit} initialValues={this.props.list} />
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.list[ownProps.match.params.id],
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, { fetchList, editList })(ListEdit);
