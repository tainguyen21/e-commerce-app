import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./MainPage.scss";
import AboutBanner from "features/AboutUs/components/AboutBanner";
import AboutInfo from "features/AboutUs/components/AboutInfo";
import AboutMember from "features/AboutUs/components/AboutMember";

MainPage.propTypes = {};

function MainPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <section className="about-banner-section">
        <AboutBanner />
      </section>

      <section className="about-info-section">
        <AboutInfo />
      </section>

      <section className="about-member-section">
        <AboutMember />
      </section>
    </div>
  );
}

export default MainPage;
