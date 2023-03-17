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


