// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // // Classic method to set state
  // constructor(props) {
  //   super(props);
  //
  //   this.state = { formReview: false };
  // }

  // Setting state with babel plugin
  state = { showFormReview: false };

  renderContent() {
    // Check flag and show review if true
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }
    // else show form
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default SurveyNew;
