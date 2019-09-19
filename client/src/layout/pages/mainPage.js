import React from "react";
import "./styles/mainPage.css";
import axios from "axios";

import Certificates from "../../components/certificates";

class MainPage extends React.Component {
  state = {
    description: "",
    photoDescription: ""
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.downloadContent();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const divAdvantages = document.querySelector("section.main div.advantages");
    if (
      divAdvantages.clientTop + divAdvantages.clientHeight / 2 <
      window.scrollY
    ) {
      document.querySelectorAll("section.main div.advantage").forEach(div => {
        // div.style.animation = "shadow 1s 1s forwards";
      });
    }
  };

  downloadContent = () => {
    axios.get("/api/loadCurrentContent").then(data => {
      const descriptionData = data.data.find(
        item => item.name === "description"
      );
      const description = descriptionData.content;

      const photoDescriptionData = data.data.find(
        item => item.name === "photoDescription"
      );
      const photoDescription = photoDescriptionData.content;

      // const photoData = data.data.find(item => item.name === "image");
      // const currentPhoto = photoData.image;

      this.setState({
        description,
        photoDescription
      });
    });
  };

  render() {
    return (
      <section className="main">
        <div className="advantages">
          <div>
            <div className="advantage">
              <i className="fas fa-child" />
              <p>Rodzinna atmosfera</p>
            </div>
          </div>
          <div>
            <div className="advantage">
              <i className="fas fa-coins" />
              <p>Przystępne ceny</p>
            </div>
          </div>
          <div>
            <div className="advantage">
              <i className="fas fa-check-double" />
              <p>100% rzetelność</p>
            </div>
          </div>
          <div>
            <div className="advantage">
              <i className="fas fa-phone-volume" />
              <p>Dostępność 24/h</p>
            </div>
          </div>
        </div>
        {/* <div className="year">
          <p>Biuro założone w 1999 roku</p>
        </div> */}
        <div className="introduction">
          <p>
            {this.state.description}
            <span>Maciej Kaczmarski</span>
          </p>
        </div>

        <Certificates />
        <div className="about">
          <div>
            <img src="/api/downloadImage/mainPageImage" alt="family" />
          </div>
          <div>
            <p>
              <span>O nas</span>
              {this.state.photoDescription}
            </p>
          </div>
        </div>
        <div className="map">
          <iframe
            title="google map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33198.30608072037!2d18.613054120040097!3d54.38539397393335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd74b9736d6507%3A0xa1d5e55183d762f0!2sTadeusza+Ko%C5%9Bciuszki+69%2C+80-446+Gda%C5%84sk!5e0!3m2!1ses!2spl!4v1566556089122!5m2!1ses!2spl"
            width="1200"
            height="400"
            allowFullScreen
          />
        </div>
      </section>
    );
  }
}

export default MainPage;
