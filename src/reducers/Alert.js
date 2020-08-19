import { ADD_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case ADD_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);

    default:
      return state;
  }
};
