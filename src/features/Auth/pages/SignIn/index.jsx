import React from "react";
import PropTypes from "prop-types";
import "./SignIn.scss";
import SignInForm from "features/Auth/components/SignInForm";
import Footer from "components/Footer";

SignIn.propTypes = {};

const handleSubmit = (data) => {
  console.log(data);
};

function SignIn(props) {
  return (
    <div>
      <div className="sign-in">
        <SignInForm onSubmit={handleSubmit} />
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
