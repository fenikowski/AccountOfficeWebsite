import React from "react";
import { Component } from "react";
import "./styles/login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";

class LoginPage extends Component {
  state = {
    user: "",
    password: "",
    info: "",
    redirect: ""
  };

  checkIfUserIsLogged = () => {
    const cookies = new Cookies();
    if (cookies.get("logged") === true) return cookies.get("user");
  };

  componentDidMount() {
    const cookies = new Cookies();
    this.setState({ redirect: cookies.get("user") });
  }

  handleInput = e => {
    if (e.target.type === "text") {
      this.setState({ user: e.target.value });
    } else if (e.target.type === "password") {
      this.setState({ password: e.target.value });
    }
  };

  handleClick = e => {
    e.preventDefault();

    axios
      .post("/api/login", {
        user: this.state.user,
        password: this.state.password
      })
      //   .then(data => data.json())
      .then(data => {
        this.setState({ info: data.data.info });

        if (data.data.info === "Zalogowano") {
          const cookies = new Cookies();
          cookies.set("logged", true, { maxAge: 30 * 60 * 1000 });
          cookies.set("user", data.data.user, { maxAge: 30 * 60 * 1000 });
          this.setState({ redirect: data.data.user });
        }
      });
  };

  render() {
    if (this.state.redirect)
      return <Redirect push to={`/${this.state.redirect}`} />;
    return (
      <section className="login">
        <form action="submit" id="login-panel">
          <p>login</p>
          <input
            type="text"
            value={this.state.user}
            onChange={this.handleInput}
          />
          <p>hasło</p>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInput}
          />
          <button onClick={this.handleClick}>Zaloguj</button>
          <p>{this.state.info}</p>
        </form>
      </section>
    );
  }
}

export default LoginPage;
