import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/mainPage";
import OffertPage from "./pages/offertPage";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";
import ContactPage from "./pages/contactPage";
import "../styles/page.css";

class Page extends React.Component {
  state = {};
  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <MainPage />} />
        <Route path="/oferta" render={() => <OffertPage />} />
        <Route path="/kontakt" render={() => <ContactPage />} />
        <Route path="/login" render={() => <LoginPage />} />
        <Route path="/admin" render={() => <AdminPage />} />
      </Switch>
    );
  }
}

export default Page;
