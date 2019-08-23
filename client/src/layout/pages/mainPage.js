import React from "react";
import "./styles/mainPage.css";

const MainPage = () => {
  return (
    <section className="main">
      <div className="introduction">
        <p>Chwytliwy opis umieścić tutaj</p>
      </div>
      <div className="advantages">
        <div>
          <div className="advantage">
            <i class="fas fa-child" />
            <p>Rodzinna atmosfera</p>
          </div>
        </div>
        <div>
          <div className="advantage">
            <i class="fas fa-coins" />
            <p>Przystępne ceny</p>
          </div>
        </div>
        <div>
          <div className="advantage">
            <i class="fas fa-check-double" />
            <p>100% rzetelność</p>
          </div>
        </div>
        <div>
          <div className="advantage">
            <i class="fas fa-phone-volume" />
            <p>Dostępność 24/h</p>
          </div>
        </div>
      </div>
      <div className="about">
        tutaj informacje o nas i zdjecie, certyfikaty, pracownicy
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33198.30608072037!2d18.613054120040097!3d54.38539397393335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd74b9736d6507%3A0xa1d5e55183d762f0!2sTadeusza+Ko%C5%9Bciuszki+69%2C+80-446+Gda%C5%84sk!5e0!3m2!1ses!2spl!4v1566556089122!5m2!1ses!2spl"
          width="1200"
          height="400"
          allowfullscreen
        />
      </div>
    </section>
  );
};

export default MainPage;
