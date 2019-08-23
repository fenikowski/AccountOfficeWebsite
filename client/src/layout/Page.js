import React from "react";
import "../styles/page.css";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";

class Page extends React.Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <MainPage />} />
        <Route path="/oferta" render={() => <MainPage />} />
        <Route path="/kontakt" render={() => <MainPage />} />
        <Route path="/login" render={() => <LoginPage />} />
        <Route path="/admin" render={() => <AdminPage />} />
      </Switch>
    );
  }
}

export default Page;
