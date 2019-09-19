import React from "react";
import "./styles/contactPage.css";
import axios from "axios";

class ContactPafe extends React.Component {
  state = {
    author: "",
    contact: "",
    textarea: "",
    info: ""
  };

  handleInput = e => {
    if (e.target.name === "author") {
      const author = e.target.value;
      this.setState({ author });
    } else if (e.target.name === "contact") {
      const contact = e.target.value;
      this.setState({ contact });
    } else if (e.target.name === "textarea") {
      const textarea = e.target.value;
      this.setState({ textarea });
    }
  };

  handleClick = e => {
    e.preventDefault();

    const { author, contact, textarea } = this.state;

    axios
      .post("/api/sendMessage", {
        author,
        contact,
        textarea
      })
      .then(data => {
        this.setState({ info: data.data.info });
      });

    this.setState({ author: "", contact: "", textarea: "" });
  };

  render() {
    return (
      <section className="contact">
        <div id="contact-data">
          <div className="map">
            <iframe
              title="google map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33198.30608072037!2d18.613054120040097!3d54.38539397393335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd74b9736d6507%3A0xa1d5e55183d762f0!2sTadeusza+Ko%C5%9Bciuszki+69%2C+80-446+Gda%C5%84sk!5e0!3m2!1ses!2spl!4v1566556089122!5m2!1ses!2spl"
              width="400"
              height="300"
              style={{ border: "black 3px solid", padding: 0, margin: 0 }}
              allowFullScreen
            />
          </div>
          <div className="contact-list">
            <div>
              <i className="fas fa-phone" />
              502135334
            </div>
            <div>
              <i className="fas fa-envelope" />
              maciejkaczmarski1@wp.pl
            </div>
            <div>
              <i className="fas fa-home" />
              ul. Kościuszki 69/7, Gdańsk
            </div>
          </div>
          <div className="opening-hours">
            <h3>Godziny otwarcia:</h3>
            <p>Od poniedziałku do piątku</p>
            <p>10:00-18:00</p>
          </div>
        </div>
        <form action="submit" id="contact-form">
          <p>Umów się na spotkanie</p>
          <input
            type="text"
            name="author"
            placeholder="autor"
            value={this.state.author}
            onChange={this.handleInput}
          />
          <input
            type="email"
            name="contact"
            placeholder="kontakt do Ciebie (tel/email)"
            value={this.state.contact}
            onChange={this.handleInput}
          />
          <textarea
            name="textarea"
            id=""
            cols="30"
            rows="10"
            placeholder="treść wiadomości"
            value={this.state.textarea}
            onChange={this.handleInput}
          />
          <button
            disabled={
              this.state.contact && this.state.author && this.state.textarea
                ? false
                : true
            }
            onClick={this.handleClick}
          >
            Wyślij
          </button>
          <p>{this.state.info}</p>
        </form>
      </section>
    );
  }
}

export default ContactPafe;
