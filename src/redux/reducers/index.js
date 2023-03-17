import { combineReducers } from "@reduxjs/toolkit";
import { productReducer, selectedProductReducer } from "./productReducer";
import {  userReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  user: userReducer,
});

export default reducers;
