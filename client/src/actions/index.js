import axios from 'axios';
import { FETCH_USER } from './types';

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
export const submitSurvey = values => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  // Dispatch new user object
  dispatch({ type: FETCH_USER, payload: res.data });
};

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
