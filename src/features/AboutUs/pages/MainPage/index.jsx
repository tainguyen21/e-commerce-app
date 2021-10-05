import Footer from "components/Footer";
import AboutBanner from "features/AboutUs/components/AboutBanner";
import AboutInfo from "features/AboutUs/components/AboutInfo";
import AboutMember from "features/AboutUs/components/AboutMember";
import AboutService from "features/AboutUs/components/AboutService";
import React, { useEffect } from "react";
import "./MainPage.scss";
import { members, services } from "constants/about";

MainPage.propTypes = {};

function MainPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="about-banner-section">
        <AboutBanner />
      </section>
      <section className="about-info-section">
        <AboutInfo />
      </section>
      <section className="about-member-section">
        <AboutMember members={members} />
      </section>
      <section className="about-service-section">
        <AboutService services={services} />
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;
