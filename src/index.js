import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import LoadingWheel from './containers/LoadingWheel';
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<LoadingWheel/>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
)
