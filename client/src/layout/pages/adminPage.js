import React from "react";
import "./styles/admin.css";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";
import axios from "axios";

class AdminPage extends React.Component {
  state = {
    urgentInfo: "",
    date: "",
    sendInfoResponse: "",
    redirect: 0
  };

  componentDidMount() {}

  checkIfUserIsLogged = () => {
    const cookies = new Cookies();
    return cookies.get("logged");
  };

  handleInput = e => {
    if (e.target.type === "text") {
      this.setState({ urgentInfo: e.target.value });
    } else if (e.target.type === "date") {
      this.setState({ date: e.target.value });
    }
  };

  handleSendUrgentInfo = e => {
    e.preventDefault();
    const date = this.state.date.split("-");
    const year = Number(date[0]);
    const month = date[1][0] === "0" ? Number(date[1][1]) : Number(date[1]);
    const day = date[2][0] === "0" ? Number(date[2][1]) : Number(date[2]);

    axios
      .post("/api/urgentInfo", {
        urgentInfo: this.state.urgentInfo,
        year,
        month,
        day
      })
      //   .then(data => data.json())
      .then(data => {
        this.setState({ sendInfoResponse: data.data.response });
      });

    //clear
    this.setState({
      urgentInfo: "",
      date: ""
    });
  };

  render() {
    if (!this.checkIfUserIsLogged()) return <Redirect push to="/login" />;
    return (
      <section className="admin">
        <div className="settings">
          <h1>Ustawienia</h1>
          <form action="submit" id="set-urgent-info">
            <p>
              Wprowadź informację, która ma być widoczna w pasku nawigacji i
              ustaw datę zakończenia jej wyświetlania:
            </p>
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.urgentInfo}
            />
            <input
              type="date"
              onChange={this.handleInput}
              value={this.state.date}
            />
            <button onClick={this.handleSendUrgentInfo}>Wyślij</button>
            <p>{this.state.sendInfoResponse}</p>
          </form>
        </div>
      </section>
    );
  }
}

export default AdminPage;
