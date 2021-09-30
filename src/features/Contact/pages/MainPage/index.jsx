import Footer from "components/Footer";
import ContactInfo from "features/Contact/components/ContactInfo";
import Location from "features/Contact/components/Location";
import React, { useEffect } from "react";
import "./MainPage.scss";

MainPage.propTypes = {};

function MainPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="contact-location-section">
        <Location />
      </section>
      <section className="contact-info-section">
        <ContactInfo />
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;
