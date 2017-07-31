import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  console.log(action);

  switch (action.type) {
    case FETCH_USER:
      // If payload = '', return false
      return action.payload || false;
    default:
      return state;
  }
}
