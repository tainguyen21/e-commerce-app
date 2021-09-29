import Footer from "components/Footer";
import SignUpForm from "features/Auth/components/SignUpForm";
import React, { useState } from "react";
import "./SignUp.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

function SignUp(props) {
  const [error, setError] = useState("");

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
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        setError("Email is already in use ");
    }
  };

  const resetError = () => {
    console.log(2);
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
