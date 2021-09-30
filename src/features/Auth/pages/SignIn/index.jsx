import Footer from "components/Footer";
import SignInForm from "features/Auth/components/SignInForm";
import { setUser } from "features/Auth/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./SignIn.scss";

SignIn.propTypes = {};

function SignIn(props) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      const auth = getAuth();
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const name = userCredential.user.displayName;
      const userInfo = {
        name,
        email,
      };

      setUser(userInfo);
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
        />
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
