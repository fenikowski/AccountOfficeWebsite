import React from "react";
import "../styles/footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          by <NavLink to="/author"> Igor Fenikowski</NavLink>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
