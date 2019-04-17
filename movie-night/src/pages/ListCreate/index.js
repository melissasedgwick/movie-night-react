import React from 'react';
import { Field, reduxForm } from 'redux-form';

export class ListCreate extends React.Component {
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

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <div>
        <h2 className="ui centre aligned icon header">Create a new movie list!</h2>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field name="title" component={this.renderInput} label="Title:"/>
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  };
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) { errors.title = 'Please enter a title for your movie list' };

  return errors;
};


export default reduxForm({
  form: 'listCreate',
  validate
})(ListCreate);
