import React from "react";
import "./App.css";
import Navigation from "./layout/Navigation";
import Header from "./layout/Header";
import Page from "./layout/Page";
import Footer from "./layout/Footer";
import LoadingScreen from "./layout/LoadingScreen";

function App() {
  return (
    <div id="app">
      <LoadingScreen />
      <Navigation />
      <Header />
      <Page />
      <Footer />
    </div>
  );
}

export default App;
