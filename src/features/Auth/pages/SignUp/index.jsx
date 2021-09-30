import Footer from "components/Footer";
import SignUpForm from "features/Auth/components/SignUpForm";
import React, { useState } from "react";
import "./SignUp.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "features/Auth/userSlice";
import { useHistory } from "react-router";

const auth = getAuth();

function SignUp(props) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(userCredential.user.auth.currentUser, {
        displayName: name,
      });

      const user = {
        name: name,
        email: email,
      };

      dispatch(setUser(user));
      history.push("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        setError("Email is already in use ");
    }
  };

  const resetError = () => {
    setError("");
  };

  return (
    <div>
      <div className="sign-up">
        <SignUpForm
          onSubmit={handleSubmit}
          error={error}
          onResetError={resetError}
        />
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
