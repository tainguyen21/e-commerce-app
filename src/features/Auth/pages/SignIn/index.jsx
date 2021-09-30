import Footer from "components/Footer";
import SignInForm from "features/Auth/components/SignInForm";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SignIn.scss";

SignIn.propTypes = {};

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function SignIn(props) {
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      const auth = getAuth();
      const { email, password } = data;

      signInWithEmailAndPassword(auth, email, password);

      history.push("/");
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case "auth/user-not-found":
          setError("Email not found");
          break;
        case "auth/wrong-password":
          setError("Wrong password");
          break;

        default:
          setError("Unknown error");
          break;
      }
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
      <div className="sign-in">
        <SignInForm
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

export default SignIn;
