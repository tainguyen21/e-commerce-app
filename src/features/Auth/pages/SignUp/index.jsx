import { doc, setDoc } from "@firebase/firestore";
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
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import db from "utils/db";
import "./SignUp.scss";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function SignUp(props) {
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async (data) => {
    try {
      const auth = getAuth();
      const { name, email, password, phone } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const id = userCredential.user.uid;
      const extraInfo = {
        products: [],
        rating: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        response: {
          rep: 0,
          total: 0,
        },
        following: 0,
        follower: 0,
        saving: [],
        phoneNumber: phone,
      };

      updateProfile(userCredential.user.auth.currentUser, {
        displayName: name,
      });

      await setDoc(doc(db, `users/${id}`), extraInfo);
      history.push("/");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use")
        setError("Email is already in use ");
    }
  };

  const onFacebookClick = async () => {
    try {
      const auth = getAuth();
      const user = await signInWithPopup(auth, facebookProvider);
      console.log(user);

      history.push("/");
    } catch (error) {
      const errorCode = error.code;
      setError(errorCode);
    }
  };

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithPopup(auth, googleProvider);
      const id = userCredential.user.uid;

      const extraInfo = {
        products: [],
        rating: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        response: {
          rep: 0,
          total: 0,
        },
        following: 0,
        follower: 0,
        saving: [],
        phoneNumber: null,
      };

      await setDoc(doc(db, `users/${id}`), extraInfo);

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
