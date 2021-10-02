import React from "react";
import PropTypes from "prop-types";
import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import "./ProfilePage.scss";

ProfilePage.propTypes = {};

function ProfilePage(props) {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="profile-section">
        <Profile />
      </section>
      <Footer />
    </div>
  );
}

export default ProfilePage;
