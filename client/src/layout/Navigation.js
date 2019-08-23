import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import "../styles/navigation.css";
import Cookies from "universal-cookie";

class Navigation extends React.Component {
  state = {
    urgentInfo: "",
    dopAnimation: ""
  };

  componentDidMount() {
    this.loadUrgentInfo();
  }

  loadUrgentInfo = () => {
    fetch("http://localhost:5000/api/urgentInfo")
      .then(data => data.json())
      .then(data => {
        if (data.content) {
          this.setState({
            urgentInfo: data.content,
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
