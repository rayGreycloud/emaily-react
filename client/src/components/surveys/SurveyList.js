import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    // Reverse array before iterating
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card blue-grey" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">
              {survey.title}
            </span>
            <p>
              {survey.body}
              <p className='right'>
                Sent On:  {new Date(survey.dateSent).toLocaleString('en-US')}
                <br/>
                Last Response:  {new Date(survey.lastResponded).toLocaleString('en-US')}
              </p>
            </p>
          </div>
          <div className="card-action">
            <a href="">
              Yes: {survey.yes}
            </a>
            <a href="">
              No: {survey.no}
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
