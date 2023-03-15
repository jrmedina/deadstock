import "./styles.scss";
import React from "react";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import LoginForm from "./LoginForm";
import Closet from "./Closet";
import Hero from "./Hero";
import Footer from "./Footer";

const App = () => {
  return (
    <main className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Hero} />
        <Route path="/list" exact component={ProductListing} />
        <Route path="/login" exact component={LoginForm} />
            <Route path="/login" exact component={LoginForm} />
        <Route path="/:username/inventory" exact component={Closet} />
        <Route path="/product/:productId" exact component={ProductDetails} />
        <Route>404 Not Found!</Route>
      </Switch>
      <Footer/>
    </main>
  );
};

export default App;
