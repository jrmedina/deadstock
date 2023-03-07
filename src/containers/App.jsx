import { useState } from "react";
import "./styles.scss";

import React from "react";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";

import LoginForm from "./LoginForm";
import Closet from "./Closet";

const App = () => {
  return (
    <main className="App">
      {" "}
      <Header />
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/" exact component={ProductListing} />
        <Route path="/:username/closet" exact component={Closet} />
        <Route path="/product/:productId" exact component={ProductDetails} />
        <Route>404 Not Found!</Route>
      </Switch>
    </main>
  );
};

export default App;
