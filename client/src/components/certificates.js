import React from "react";
import axios from "axios";

import "./styles/certificates.css";

class Certificates extends React.Component {
  state = {
    certificates: []
  };

  componentDidMount() {
    this.downloadCertificates();
  }

  downloadCertificates = () => {
    axios
      .get("/api/getCertificates")
      .then(data => this.setState({ certificates: data.data }));
  };

  render() {
    const certificates = this.state.certificates.map(item => (
      <div className="certificate">
        <img src={`/api/showImage/${item.filename}`} alt="certyfikat" />
      </div>
    ));

    return (
      <div id="certificates">
        <h2 className="certificates">Nasze certyfikaty</h2>
        <div className="certificates">{certificates}</div>
      </div>
    );
  }
}

export default Certificates;
