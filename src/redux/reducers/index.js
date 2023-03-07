import { combineReducers } from "@reduxjs/toolkit";
import { productReducer, selectedProductReducer } from "./productReducer";
import { credentialsReducer, userReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  user: userReducer,
  credentials: credentialsReducer,
});

export default reducers;
