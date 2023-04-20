import "./styles.scss";
import React from "react";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import LoginForm from "./LoginForm";
import UserInventory from "./UserInventory";
import Hero from "./Hero";
import Footer from "./Footer";
import ProductComponent from "./ProductList";
import Favorites from "./Favorites";

const App = () => {

  return (
    <main className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Hero} />
        <Route path="/list" exact component={ProductComponent} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/:username/inventory" exact component={UserInventory} />
        <Route path="/product/:productId" exact component={ProductDetails} />
        <Route path="/:username/favorites" exact component={Favorites} />
        <Route path="*">404 Not Found!</Route>
      </Switch>
      <Footer />
    </main>
  );
};

export default App;
