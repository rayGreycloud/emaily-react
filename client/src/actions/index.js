import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_SURVEYS } from './types';
import { DELETE_SURVEY } from './types';

// Fetch user
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  // Only need data prop
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Handle stripe payment token
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

// Handle survey form submit
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  // Use history object to redirect
  history.push('/surveys');
  // Dispatch new user object
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Fetch surveys
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  // Payload is array of surveys
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

// Delete Survey
export const deleteSurvey = (id) => async dispatch => {
  const res = await axios.delete(`/api/surveys/${id}`);
  dispatch({ type: DELETE_SURVEY, payload: res.data });
};

// ES5 syntax
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get("/api/current_user").then(res =>
//       dispatch({
//         type: FETCH_USER,
//         payload: res
//       })
//     );
//   };
// };
