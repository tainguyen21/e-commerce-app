import { doc, getDoc, setDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import SignInForm from "features/Auth/components/SignInForm";
import { setUser } from "features/Auth/userSlice";
import {
  //FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import db from "utils/db";
import "./SignIn.scss";

SignIn.propTypes = {};

const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

function SignIn(props) {
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSubmit = async (data) => {
    try {
      const auth = getAuth();
      const { email, password } = data;

      await signInWithEmailAndPassword(auth, email, password);

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
    // try {
    //   const auth = getAuth();
    //   await signInWithPopup(auth, facebookProvider);
    //   history.push("/");
    // } catch (error) {
    //   const errorCode = error.code;
    //   setError(errorCode);
    // }
  };

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithPopup(auth, googleProvider);
      const id = userCredential.user.uid;
      const userSnapshot = await getDoc(doc(db, `users/${id}`));
      const user = userSnapshot.data();

      if (!user) {
        const createAt = userCredential.user.metadata.creationTime;
        const createAtDate = new Date(createAt);

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
          following: [],
          follower: [],
          saving: [],
          phoneNumber: null,
          name: userCredential.user.displayName,
          memberFrom: createAtDate.toLocaleString().split(",")[0],
          messages: {},
        };

        await setDoc(doc(db, `users/${id}`), extraInfo);

        const userInfo = {
          ...extraInfo,
          id,
          email: userCredential.user.email,
        };

        dispatch(setUser(userInfo));
      }

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
