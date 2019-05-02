import React from 'react';
import { connect } from 'react-redux';
import { createList } from '../../actions';
import ListForm from '../../components/ListForm/';

export class ListCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createList(formValues);
  }

  render() {
    return (
      <div>
        <h2 className="ui centre aligned icon header">Create a new movie list!</h2>
        <ListForm onSubmit={this.onSubmit} />
      </div>
    );
  };
};

export default connect(null, { createList })(ListCreate);
