import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Link } from "react-router-dom";
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

UpdateForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
};

UpdateForm.defaultProps = {
  user: {},
  onSubmit: null,
};

const schema = yup.object({
  name: yup.string().required("This field is required"),
  phoneNumber: yup
    .number()
    .required("This field is required")
    .min(1000000000, "Invalid phone number")
    .max(99999999999, "Invalid phone number"),
});

function UpdateForm(props) {
  const { user, onSubmit } = props;
  const { name: userName, phoneNumber: userPhoneNumber } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: userName,
      phoneNumber: userPhoneNumber,
    },
  });

  const name = register("name");
  const phoneNumber = register("phoneNumber");

  return (
    <div className="signin-form">
      <Link to="/" className="signin-form__heading">
        Update <span>Profile</span>
      </Link>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormGroup>
          <Label className="signin-form__label" for="name">
            Name
          </Label>
          <Input
            id="name"
            className="signin-form__input"
            placeholder="John Cena"
            name={name.name}
            onChange={name.onChange}
            onBlur={name.onBlur}
            innerRef={name.ref}
            invalid={errors.name && true}
            defaultValue={userName}
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className="signin-form__label" for="phone">
            Phone Number
          </Label>
          <Input
            id="phone"
            className="signin-form__input"
            placeholder="9-10 numbers"
            name={phoneNumber.name}
            onChange={phoneNumber.onChange}
            onBlur={phoneNumber.onBlur}
            innerRef={phoneNumber.ref}
            invalid={errors.phone && true}
            type="number"
            defaultValue={userPhoneNumber}
          />
          <FormFeedback>
            {errors.phoneNumber
              ? errors.phoneNumber.type === "typeError"
                ? "This field is required"
                : errors.phoneNumber.message
              : ""}
          </FormFeedback>
        </FormGroup>
        <Button className="button button--red">Update</Button>
      </Form>
    </div>
  );
}

export default UpdateForm;
