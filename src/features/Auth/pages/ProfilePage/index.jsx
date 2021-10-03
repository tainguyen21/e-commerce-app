import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import React, { useEffect } from "react";
import "./ProfilePage.scss";

ProfilePage.propTypes = {};

function ProfilePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
