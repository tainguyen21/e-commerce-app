import { doc, getFirestore, setDoc } from "@firebase/firestore";
import Footer from "components/Footer";
import SignUpForm from "features/Auth/components/SignUpForm";
import { setUser } from "features/Auth/userSlice";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./SignUp.scss";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const db = getFirestore();

function SignUp(props) {
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      const auth = getAuth();
      const { name, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const id = userCredential.user.uid;
      const createAt = userCredential.user.metadata.creationTime;
      const createAtDate = new Date(createAt);

      console.log(userCredential);

      updateProfile(userCredential.user.auth.currentUser, {
        displayName: name,
      });

      dispatch(
        setUser({
          name,
          email,
          id,
          memberFrom: createAtDate.toLocaleString().split(",")[0],
        })
      );

      await setDoc(doc(db, `users/${id}`), {
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
      });

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
