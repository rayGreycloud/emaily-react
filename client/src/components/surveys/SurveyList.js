import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

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
            <div>
              {survey.body}
              <p className='right'>
                Sent On:  {new Date(survey.dateSent).toLocaleString('en-US')}
                <br/>
                Last Response:  {new Date(survey.lastResponded).toLocaleString('en-US')}
              </p>
            </div>
          </div>
          <div className="card-action">
            <a href="">
              Yes: {survey.yes}
            </a>
            <a href="">
              No: {survey.no}
            </a>

            <button
              className="red lighten-1  white-text btn-flat"
              onClick={() => this.props.deleteSurvey(survey._id)}
            >
              Delete
              <i className="material-icons right">delete</i>
            </button>
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

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);
