import React from 'react';
import { connect } from 'react-redux';
import { fetchList, editList } from '../../actions';
import ListForm from '../../components/ListForm/';

export class ListEdit extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editList(this.props.match.params.id, formValues);
  }

  render() {
    return (
      <div>
        <h2 className="ui centre aligned icon header">Edit List</h2>
        <ListForm onSubmit={this.onSubmit} />
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { lists: state.list[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchList, editList })(ListEdit);
