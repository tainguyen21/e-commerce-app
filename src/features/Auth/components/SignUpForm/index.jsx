import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as yup from "yup";

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  onResetError: PropTypes.func,
  onFacebookClick: PropTypes.func,
  onGoogleClick: PropTypes.func,
};

SignUpForm.defaultProps = {
  onSubmit: null,
  error: "",
  onResetError: null,
  onFacebookClick: null,
  onGoogleClick: null,
};

const schema = yup.object({
  name: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid"),
  phone: yup
    .number()
    .required("")
    .min(1000000000, "Invalid phone number")
    .max(99999999999, "Invalid phone number"),
  password: yup
    .string()
    .required("This field is required")
    .min(6, "Password must at least 6 characters"),
  re_password: yup
    .string()
    .required("This field is required")
    .min(6, "Password must at least 6 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function SignUpForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { onSubmit, error, onResetError, onFacebookClick, onGoogleClick } =
    props;

  const name = register("name");
  const email = register("email");
  const phone = register("phone");
  const password = register("password");
  const re_password = register("re_password");

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
          <Label className="signin-form__label" for="name">
            Name
          </Label>
          <Input
            id="name"
            className="signin-form__input"
            placeholder="Your name here"
            name={name.name}
            onChange={name.onChange}
            onBlur={name.onBlur}
            innerRef={name.ref}
            invalid={errors.name && true}
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
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
          <Label className="signin-form__label" for="phone">
            Phone Number
          </Label>
          <Input
            id="phone"
            className="signin-form__input"
            placeholder="Phone number"
            name={phone.name}
            onChange={phone.onChange}
            onBlur={phone.onBlur}
            innerRef={phone.ref}
            invalid={errors.phone && true}
            type="number"
          />
          <FormFeedback>
            {errors.phone
              ? errors.phone.type === "typeError"
                ? "This field is required"
                : errors.phone.message
              : ""}
          </FormFeedback>
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
        <FormGroup>
          <Label className="signin-form__label" for="re_password">
            Re_Password
          </Label>
          <Input
            id="re_password"
            className="signin-form__input"
            placeholder="6+ characters"
            type="password"
            name={re_password.name}
            onChange={re_password.onChange}
            onBlur={re_password.onBlur}
            innerRef={re_password.ref}
            invalid={errors.re_password && true}
          />
          <FormFeedback>
            {errors.re_password && errors.re_password.message}
          </FormFeedback>
        </FormGroup>
        {error && <div className="signin-form__error">{error}</div>}
        <Button className="button button--red">Sign up</Button>
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
        Already have account? <Link to="/sign-in">Sign in now</Link>
      </div>
    </div>
  );
}

export default SignUpForm;
