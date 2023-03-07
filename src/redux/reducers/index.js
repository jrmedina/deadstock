import { combineReducers } from "@reduxjs/toolkit";
import { productReducer, selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  producet: selectedProductReducer,
});

export default reducers;
