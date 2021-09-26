import React from "react";
import PropTypes from "prop-types";
import "./MainPage.scss";
import AboutBanner from "features/AboutUs/components/AboutBanner";
import AboutInfo from "features/AboutUs/components/AboutInfo";

MainPage.propTypes = {};

function MainPage(props) {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <section className="about-banner-section">
        <AboutBanner />
      </section>

      <section className="about-info-section">
        <AboutInfo />
      </section>
    </div>
  );
}

export default MainPage;
