import React from "react";
import PropTypes from "prop-types";
import "./AboutBanner.scss";

AboutBanner.propTypes = {};

function AboutBanner(props) {
  return (
    <div className="about-banner">
      <img
        className="about-banner__image"
        src="https://images.unsplash.com/photo-1632480337464-c27d19164f2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1175&q=80"
        alt="about-banner"
      />
      <div className="about-banner__overlay"></div>
      <span>About us</span>
      <h3>Our company</h3>
    </div>
  );
}

export default AboutBanner;
