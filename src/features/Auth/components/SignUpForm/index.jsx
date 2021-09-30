import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  onResetError: PropTypes.func,
};

SignUpForm.defaultProps = {
  onSubmit: null,
  error: "",
  onResetError: null,
};

const schema = yup.object({
  name: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Email is invalid"),
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

  const { onSubmit, error, onResetError } = props;

  const name = register("name");
  const email = register("email");
  const password = register("password");
  const re_password = register("re_password");

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
        <li>
          Sign in with Google
          <i className="fab fa-facebook"></i>
        </li>
        <li>
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
