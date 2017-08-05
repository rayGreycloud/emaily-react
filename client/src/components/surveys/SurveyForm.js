// SurveyForm shows form to add new survey
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          key={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// Validate input values
function validate(values) {
  const errors = {};

  // Validate emails first
  errors.emails = validateEmails(values.emails || '');

  // Iterate over fields, pull off name prop
  _.each(formFields, ({ label, name }) => {
    // Check field, add error if empty
    if (!values[name] && values[name] === 'emails') {
      errors[name] = 'You must provide at least one recipient';
    } else if (!values[name]) {
      errors[name] = `You must provide a ${label}`;
    }
  });

  return errors;
}

// Wire up reduxForm to our form
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
