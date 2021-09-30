import Footer from "components/Footer";
import SignUpForm from "features/Auth/components/SignUpForm";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SignUp.scss";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function SignUp(props) {
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      const auth = getAuth();
      const { name, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(userCredential.user.auth.currentUser, {
        displayName: name,
      });

      history.push("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        setError("Email is already in use ");
    }
  };

  const onFacebookClick = async () => {
    try {
      const auth = getAuth();
      signInWithPopup(auth, facebookProvider);

      history.push("/");
    } catch (error) {
      const errorCode = error.code;
      setError(errorCode);
    }
  };

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      signInWithPopup(auth, googleProvider);

      history.push("/");
    } catch (error) {
      const errorCode = error.code;
      setError(errorCode);
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
          onFacebookClick={onFacebookClick}
          onGoogleClick={onGoogleClick}
        />
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
