import { ActionTypes } from "../constants/action-types";

export const setUser = (product) => {
  return {
    type: ActionTypes.SET_USER,
    payload: product,
  };
};

export const removeSetUser = () => {
  return {
    type: ActionTypes.REMOVE_USER,
  };
};

export const setCredentials = (cred) => {
  return {
    type: ActionTypes.SET_CREDENTIALS,
    payload: cred,
  };
};

export const removeCredentials = () => {
  return {
    type: ActionTypes.REMOVE_CREDENTIALS,
  };
};
