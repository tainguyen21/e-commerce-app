import Footer from "components/Footer";
import Profile from "features/Auth/components/Profile";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.scss";

ProfilePage.propTypes = {};

function ProfilePage(props) {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="profile-section">
        <Profile user={user} />
      </section>
      <Footer />
    </div>
  );
}

export default ProfilePage;
