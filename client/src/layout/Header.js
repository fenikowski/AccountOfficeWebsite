import React from "react";
import "../styles/header.css";
import { Switch, Route } from "react-router-dom";

const Header = () => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <header>
            <h1>Biuro Rachunkowe Konfort</h1>
            <h2>Maciej Kaczmarski</h2>
          </header>
        )}
      />
    </Switch>
  );
};

export default Header;
