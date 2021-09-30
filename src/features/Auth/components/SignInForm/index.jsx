import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./SignInFrom.scss";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Link } from "react-router-dom";

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  onResetError: PropTypes.func,
  onFacebookClick: PropTypes.func,
  onGoogleClick: PropTypes.func,
};

SignInForm.defaultProps = {
  onSubmit: null,
  error: "",
  onResetError: null,
  onFacebookClick: null,
  onGoogleClick: null,
};

const schema = yup.object({
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid"),
  password: yup
    .string()
    .required("This field is required")
    .min(6, "Password must at least 6 characters"),
});

function SignInForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { onSubmit, error, onResetError, onFacebookClick, onGoogleClick } =
    props;

  const email = register("email");
  const password = register("password");

  const handleFacebookClick = () => {
    if (onFacebookClick) onFacebookClick();
  };

  const handleGoogleClick = () => {
    if (onGoogleClick) onGoogleClick();
  };

  useEffect(() => {
    window.onkeydown = () => {
      if (error) onResetError();
    };
  });

  return (
    <div className="signin-form">
      <Link to="/" className="signin-form__heading">
        Welcome to <span>Sixteen</span>
      </Link>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormGroup>
          <Label className="signin-form__label" for="email">
            Email
          </Label>
          <Input
            id="email"
            className="signin-form__input"
            placeholder="example@gmail.com"
            name={email.name}
            onChange={email.onChange}
            onBlur={email.onBlur}
            innerRef={email.ref}
            invalid={errors.email && true}
          />
          <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className="signin-form__label" for="password">
            Password
          </Label>
          <Input
            id="password"
            className="signin-form__input"
            placeholder="6+ characters"
            type="password"
            name={password.name}
            onChange={password.onChange}
            onBlur={password.onBlur}
            innerRef={password.ref}
            invalid={errors.password && true}
          />
          <FormFeedback>
            {errors.password && errors.password.message}
          </FormFeedback>
        </FormGroup>
        <div className="signin-form__forgot">Forgot password?</div>
        {error && <div className="signin-form__error">{error}</div>}
        <Button className="button button--red">Login</Button>
      </Form>
      <div className="signin-form__line">
        <span>or</span>
      </div>
      <ul>
        <li onClick={handleGoogleClick}>
          Sign in with Google
          <i className="fab fa-facebook"></i>
        </li>
        <li onClick={handleFacebookClick}>
          Sign in with Facebook
          <i className="fab fa-google"></i>
        </li>
      </ul>
      <div className="signin-form__register">
        Don't have account? <Link to="/sign-up">Sign up now</Link>
      </div>
    </div>
  );
}

export default SignInForm;
