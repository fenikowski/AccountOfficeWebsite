import React from "react";
import "./styles/authorPage.css";

const Author = () => {
  return (
    <section className="author">
      <p>
        Autor: <span>Igor Fenikowski</span>
      </p>
      <p>
        Design: <span>Igor Fenikowski</span>
      </p>
      <p>
        Odwiedz moją stronę tutaj:{" "}
        <a href="http://www.fenikowski.site">fenikowski.site</a>
      </p>
      <p>
        Lub napisz do mnie na: <span>fenikowski@gmail.com</span>
      </p>
    </section>
  );
};

export default Author;
