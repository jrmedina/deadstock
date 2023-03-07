import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_USER:
      return {};
    default:
      return state;
  }
};

export const credentialsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CREDENTIALS:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_CREDENTIALS:
      return {};
    default:
      return state;
  }
};
