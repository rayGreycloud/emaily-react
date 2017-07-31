import axios from "axios";
import { FETCH_USER } from "./types";

// Refactor using arrow and async/await
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // Only need data prop
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