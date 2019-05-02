import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchList, editList } from '../../actions';

export class ListEdit extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.match.params.id);
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    } else { return null };
  };

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.editList(this.props.match.params.id, formValues);
  }

  render() {
    return (
      <div>
        <h2 className="ui centre aligned icon header">Edit List</h2>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field name="title" component={this.renderInput} label="Title:" />
          <button className="ui button primary">Submit Changes</button>
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { lists: state.list[ownProps.match.params.id] };
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) { errors.title = 'Please enter a title for your movie list' };

  return errors;
};

const formWrapped = reduxForm({
  form: 'listEdit',
  validate
})(ListEdit);

export default connect(mapStateToProps, { fetchList, editList })(formWrapped);
