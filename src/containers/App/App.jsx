import { useState } from "react";
import "./styles.scss";

import React from "react";
import Header from "../Header/Header";
import { Route, Switch } from "react-router-dom";
import ProductListing from "../ProductListing/ProductListing";
import ProductDetails from "../ProductDetails/ProductDetails";

const App = () => {
  return (
    <main className="App">
      {" "}
      <Header />
      <Switch>
        <Route path="/" exact component={ProductListing} />
        <Route path="/product/:productId" exact component={ProductDetails} />
        <Route>404 Not Found!</Route>
      </Switch>
    </main>
  );
};

export default App;
