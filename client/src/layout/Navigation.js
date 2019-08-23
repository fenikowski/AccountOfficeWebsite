import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import "../styles/navigation.css";
import Cookies from "universal-cookie";
import axios from "axios";

class Navigation extends React.Component {
  state = {
    urgentInfo: "",
    dopAnimation: ""
  };

  componentDidMount() {
    this.loadUrgentInfo();
  }

  loadUrgentInfo = () => {
    axios.get("/api/urgentInfo").then(data => {
      if (data.data.content) {
        this.setState({
          urgentInfo: data.data.content,
          dopAnimation: "blink 1s infinite"
        });
      }
    });
  };

  handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("logged");
    cookies.remove("user");
  };

  render() {
    return (
      <nav>
        <div id="urgent-info">
          <p>
            <span style={{ animation: this.state.dopAnimation }}>•</span>
            {this.state.urgentInfo}
          </p>
        </div>
        <NavLink to="/" exact>
          Start
        </NavLink>
        <NavLink to="/oferta">Oferta</NavLink>
        <NavLink to="/kontakt">Kontakt</NavLink>
        <Switch>
          <Route path="/admin">
            <NavLink to="/login" onClick={this.handleLogout}>
              Wyloguj
            </NavLink>
          </Route>
          <Route>
            <NavLink to="/login">Zaloguj</NavLink>
          </Route>
        </Switch>
      </nav>
    );
  }
}

export default Navigation;
