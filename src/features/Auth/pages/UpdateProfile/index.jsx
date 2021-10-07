import { getAuth, updateProfile } from "@firebase/auth";
import { doc, updateDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import UpdateForm from "features/Auth/components/UpdateForm";
import { updateUser } from "features/Auth/userSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import db from "utils/db";
import "./UpdateProfile.scss";

UpdateProfile.propTypes = {};

function UpdateProfile(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdateSubmit = async (data) => {
    if (data.name !== user.name) {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: data.name,
      });

      await updateDoc(doc(db, `users/${user.id}`), {
        name: data.name,
      });

      dispatch(
        updateUser({
          name: data.name,
        })
      );
    }

    if (data.phoneNumber !== user.phoneNumber) {
      await updateDoc(doc(db, `users/${user.id}`), {
        phoneNumber: data.phoneNumber,
      });

      dispatch(
        updateUser({
          phoneNumber: data.phoneNumber,
        })
      );
    }

    alert("Update successfully");
    history.push("/profile");
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <section className="update-profile-section">
        <UpdateForm user={user} onSubmit={handleUpdateSubmit} />
      </section>
      <Footer />
    </div>
  );
}

export default UpdateProfile;
