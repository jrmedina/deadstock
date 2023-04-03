// import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { productReducer, selectedProductReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  user: persistedReducer,
});



export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);