import React from "react";
import "../styles/loading-screen.css";

class LoadingScreen extends React.Component {
  state = {
    topPosition: "0vh",
    bottomPosition: "50vh"
  };

  componentDidMount() {
    const scrollBlocker = () => {
      window.scrollTo(0, 0);
    };

    if (sessionStorage.getItem("pageLoaded") === "true") {
      document.querySelector("div#loading-screen").remove();
    } else {
      window.addEventListener("scroll", scrollBlocker);
      let flagForLoading = false;

      setTimeout(() => {
        flagForLoading = true;
      }, 1000);

      const readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete" && flagForLoading === true) {
          clearInterval(readyStateCheckInterval);
          whenPageLoaded();
        }
      }, 100);
    }

    const whenPageLoaded = () => {
      sessionStorage.setItem("pageLoaded", "true");

      this.setState({
        topPosition: "-43vh",
        bottomPosition: "100vh"
      });

      document.querySelector("div.lds-spinner").remove();

      setTimeout(() => {
        window.removeEventListener("scroll", scrollBlocker);
        document.querySelector("div#loading-screen").remove();
      }, 500);
    };
  }
  render() {
    return (
      <div id="loading-screen">
        <div className="top" style={{ top: this.state.topPosition }}>
          <div />
        </div>
        <div className="bottom" style={{ top: this.state.bottomPosition }}>
          <div />
        </div>
        <div className="lds-spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
