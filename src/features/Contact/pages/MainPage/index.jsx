import React from "react";
import PropTypes from "prop-types";
import "./MainPage.scss";
import ContactInfo from "features/Contact/components/ContactInfo";

MainPage.propTypes = {};

function MainPage(props) {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="contact-info-section">
        <ContactInfo />
      </section>
    </div>
  );
}

export default MainPage;
