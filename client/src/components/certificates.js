import React from "react";
import axios from "axios";

import "./styles/certificates.css";

class Certificates extends React.Component {
  state = {
    certificates: [],
    show: ""
  };

  componentDidMount() {
    this.downloadCertificates();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.setState({ show: "" });
  };

  downloadCertificates = () => {
    axios
      .get("/api/getCertificates")
      .then(data => this.setState({ certificates: data.data }));
  };

  showCertificate = link => {
    this.setState({ show: link });
  };

  render() {
    const certificates = this.state.certificates.map((item, index) => (
      <div
        key={index}
        className="certificate"
        onClick={() =>
          this.setState({ show: `/api/showImage/${item.filename}` })
        }
      >
        <img src={`/api/showImage/${item.filename}`} alt="certyfikat" />
      </div>
    ));

    return (
      <div id="certificates">
        <h2 className="certificates">Nasze certyfikaty</h2>
        <div className="certificates">{certificates}</div>
        <div
          className="certificate-closeup"
          style={{
            display: this.state.show ? "block" : "none"
          }}
        >
          <img src={this.state.show} alt="" />
          <i
            onClick={() => this.setState({ show: "" })}
            className="fas fa-times"
          ></i>
        </div>
      </div>
    );
  }
}

export default Certificates;
