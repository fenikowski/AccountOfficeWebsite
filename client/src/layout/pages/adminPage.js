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
    currentUrgentInfo: "",
    description: "",
    currentDescription: "",
    descriptionResponse: "",
    photo: "",
    photoResponse: "",
    currentPhoto: "",
    photoDescription: "",
    photoDescriptionResponse: "",
    currentPhotoDescription: "",
    certificates: [],
    redirect: 0,
    sendCertificate: false,
    sendPhoto: false
  };

  componentDidMount() {
    this.downloadCurrentInfo();
    this.downloadCertificates();
  }

  checkIfUserIsLogged = () => {
    const cookies = new Cookies();
    return cookies.get("logged");
  };

  handleInput = e => {
    if (e.target.name === "urgentInfo") {
      this.setState({ urgentInfo: e.target.value });
    } else if (e.target.name === "description") {
      this.setState({ description: e.target.value });
    } else if (e.target.name === "photoDescription") {
      this.setState({ photoDescription: e.target.value });
    } else if (e.target.name === "photo") {
      this.setState({ photo: e.target.value });
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
      .then(data => {
        this.setState({ sendInfoResponse: data.data.response });
        // actualize info
        this.downloadCurrentInfo();
      });

    //clear
    this.setState({
      urgentInfo: "",
      date: ""
    });
  };

  quitUrgentInfo = e => {
    e.preventDefault();

    axios
      .post("/api/urgentInfo", {
        urgentInfo: "",
        year: 1990,
        month: 1,
        day: 1
      })
      .then(data => {
        this.setState({ sendInfoResponse: data.data.response });
        // actualize info
        this.downloadCurrentInfo();
      });

    //clear
    this.setState({
      urgentInfo: "",
      date: ""
    });
  };

  handleSendDescription = e => {
    e.preventDefault();

    axios
      .post("/api/updateDescription", {
        description: this.state.description
      })
      .then(data => {
        this.setState({ descriptionResponse: data.data.response });
        // actualize info
        this.downloadCurrentInfo();
      });

    //clear
    this.setState({
      description: ""
    });
  };

  handleSendPhotoDescription = e => {
    e.preventDefault();

    axios
      .post("/api/updatePhotoDescription", {
        description: this.state.photoDescription
      })
      .then(data => {
        this.setState({ photoDescriptionResponse: data.data.response });
        // actualize info
        this.downloadCurrentInfo();
      });

    //clear
    this.setState({
      photoDescription: ""
    });
  };

  downloadCurrentInfo = () => {
    axios.get("/api/loadCurrentContent").then(data => {
      const urgentInfoData = data.data.find(item => item.name === "urgentInfo");
      const currentUrgentInfo = urgentInfoData.content;

      const descriptionData = data.data.find(
        item => item.name === "description"
      );
      const currentDescription = descriptionData.content;

      const photoDescriptionData = data.data.find(
        item => item.name === "photoDescription"
      );
      const currentPhotoDescription = photoDescriptionData.content;

      this.setState({
        currentUrgentInfo,
        currentDescription,
        currentPhotoDescription
      });
    });
  };

  handleChange = e => {
    if (e.target.id === "certificate" && e.target.files) {
      this.setState({ sendCertificate: true });
    } else if (e.target.id === "file" && e.target.files) {
      this.setState({ sendPhoto: true });
    }
  };

  downloadCertificates = () => {
    axios.get("/api/getCertificates").then(data => {
      this.setState({ certificates: data.data });
    });
  };

  deleteCertificate = filename => {
    axios
      .delete(`/api/deleteCertificate/${filename}`, { filename: filename })
      .then(() => {
        this.downloadCertificates();
      });
  };

  render() {
    if (!this.checkIfUserIsLogged()) return <Redirect push to="/login" />;

    const certificates = this.state.certificates.map((item, index) => (
      <div key={index} className="certificate">
        <p>{item.frontEndName}</p>
        <button onClick={this.deleteCertificate.bind(this, item.filename)}>
          Usuń
        </button>
      </div>
    ));

    return (
      <section className="admin">
        <div className="titles">
          <h1>Ustawienia</h1>
          <h1>Aktualne informacje</h1>
        </div>
        <div className="row">
          <div>
            <form action="submit" id="set-urgent-info">
              <p className="form-info">
                Wprowadź informację, która ma być widoczna w pasku nawigacji i
                ustaw datę zakończenia jej wyświetlania:
              </p>
              <input
                type="text"
                onChange={this.handleInput}
                value={this.state.urgentInfo}
                name="urgentInfo"
              />
              <input
                type="date"
                onChange={this.handleInput}
                value={this.state.date}
                name="date"
              />
              <button
                onClick={this.handleSendUrgentInfo}
                disabled={
                  this.state.urgentInfo && this.state.date ? false : true
                }
                style={{
                  backgroundColor:
                    this.state.urgentInfo && this.state.date ? "" : "lightgray"
                }}
              >
                Wyślij
              </button>
              <button
                onClick={this.quitUrgentInfo}
                style={{ marginLeft: "1vw", backgroundColor: "lightcoral" }}
              >
                Wyłącz
              </button>
              <p
                style={{
                  color: "lightgreen",
                  display: "inline-block",
                  marginLeft: "15px"
                }}
              >
                {this.state.sendInfoResponse}
              </p>
            </form>
          </div>
          <div>
            <div className="current-info">
              <p>Aktualnie wyświetlana informacja:</p>
              <span>{this.state.currentUrgentInfo}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <form action="submit" id="set-description">
              <p className="form-info">
                Wprowadź opis, który będzie widoczny na stronie startowej
              </p>
              <textarea
                onChange={this.handleInput}
                value={this.state.description}
                name="description"
              />
              <button
                onClick={this.handleSendDescription}
                disabled={this.state.description ? false : true}
                style={{
                  backgroundColor: this.state.description ? "" : "lightgray"
                }}
              >
                Wyślij
              </button>
              <p
                style={{
                  color: "lightgreen",
                  display: "inline-block",
                  marginLeft: "15px"
                }}
              >
                {this.state.descriptionResponse}
              </p>
            </form>
          </div>
          <div>
            <div className="current-info">
              <p>Aktualnie wyświetlany opis:</p>
              <span>{this.state.currentDescription}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <form action="submit" id="set-description">
              <p className="form-info">
                Wprowadź opis, który będzie widoczny przy zdjęciu na stronie
                startowej
              </p>
              <textarea
                onChange={this.handleInput}
                value={this.state.photoDescription}
                name="photoDescription"
              />
              <button
                disabled={this.state.photoDescription ? false : true}
                style={{
                  backgroundColor: this.state.photoDescription
                    ? ""
                    : "lightgray"
                }}
                onClick={this.handleSendPhotoDescription}
              >
                Wyślij
              </button>
              <p
                style={{
                  color: "lightgreen",
                  display: "inline-block",
                  marginLeft: "15px"
                }}
              >
                {this.state.photoDescriptionResponse}
              </p>
            </form>
          </div>
          <div>
            <div className="current-info">
              <p>Aktualnie wyświetlany opis:</p>
              <span>{this.state.currentPhotoDescription}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <form
              action="/api/updatePhoto/mainPageImage"
              method="POST"
              id="set-photo"
              encType="multipart/form-data"
            >
              <p className="form-info">
                Prześlij zdjęcie które będzie widoczne na stronie startowej
              </p>
              <input
                type="file"
                name="file"
                id="file"
                encType="multipart/form-data"
                onChange={this.handleChange}
              />
              <input
                type="submit"
                disabled={!this.state.sendPhoto}
                style={{
                  backgroundColor:
                    this.state.sendPhoto === false ? "lightgray" : ""
                }}
              />
              <p
                style={{
                  color: "lightgreen",
                  display: "inline-block",
                  marginLeft: "15px"
                }}
              >
                {this.state.photoResponse}
              </p>
            </form>
          </div>
          <div>
            <div className="current-info">
              <p>Aktualnie wyświetlane zdjęcie:</p>
            </div>
            <img src="/api/downloadImage/mainPageImage" alt="" />
          </div>
        </div>
        <div className="row">
          <div>
            <form
              action="/api/updatePhoto/certificate"
              method="POST"
              id="set-photo"
              encType="multipart/form-data"
            >
              <p className="form-info">Prześlij certyfikaty</p>
              <input
                type="file"
                name="file"
                id="certificate"
                encType="multipart/form-data"
                onChange={this.handleChange}
              />
              <input
                type="submit"
                disabled={!this.state.sendCertificate}
                style={{
                  backgroundColor:
                    this.state.sendCertificate === false ? "lightgray" : ""
                }}
              />
              <p
                style={{
                  color: "lightgreen",
                  display: "inline-block",
                  marginLeft: "15px"
                }}
              ></p>
            </form>
          </div>
          <div>
            <div className="current-info">
              <p>Aktualne certyfikaty</p>
              <div className="certificates-board">{certificates}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AdminPage;
