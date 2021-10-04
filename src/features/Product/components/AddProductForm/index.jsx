import React from "react";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Select from "react-select";

AddProductForm.propTypes = {
  onSubmit: PropTypes.func,
};

AddProductForm.defaultProps = {
  obSubmit: () => {},
};

const schema = yup.object({
  type: yup.object().required("123"),
  name: yup.string().required("This field is required"),
  address: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  price: yup.number().required(""),
});

function AddProductForm(props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { onSubmit } = props;

  const name = register("name");
  const description = register("description");
  const image = register("image");
  const price = register("price");
  const address = register("address");

  const options = [
    { value: "pet", label: "Pets" },
    { value: "fashion", label: "Fashion" },
    { value: "sport", label: "Sport" },
    { value: "houseware", label: "Houseware" },
    { value: "technology", label: "Technology" },
    { value: "other", label: "Other" },
  ];

  console.log(errors);

  return (
    <div className="signin-form">
      <h2 className="signin-form__heading">
        Add <span>Product</span>
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormGroup>
          <Label className="signin-form__label" htmlFor="type">
            Type
          </Label>
          <Controller
            id="type"
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} options={options} id="type" />
            )}
          />
          <div className={errors.type ? "is-invalid" : ""}></div>
          <FormFeedback>{errors.type && "This field is required"}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className="signin-form__label" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            className="signin-form__input"
            placeholder="Iphone 13 Pro Max"
            name={name.name}
            onChange={name.onChange}
            onBlur={name.onBlur}
            innerRef={name.ref}
            invalid={errors.name && true}
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className="signin-form__label" for="description">
            Description
          </Label>
          <Input
            id="description"
            className="signin-form__input"
            placeholder="Your description here"
            name={description.name}
            onChange={description.onChange}
            onBlur={description.onBlur}
            innerRef={description.ref}
            invalid={errors.description && true}
          />
          <FormFeedback>
            {errors.description && errors.description.message}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label
            className="signin-form__label"
            for="image"
            style={{ display: "block" }}
          >
            Image
          </Label>
          <Input
            id="image"
            className="signin-form__input"
            placeholder="Images about your product"
            name={image.name}
            onChange={image.onChange}
            onBlur={image.onBlur}
            innerRef={image.ref}
            invalid={errors.image && true}
            type="file"
            multiple
            style={{ padding: "6px 0" }}
            required
          />
          <FormFeedback>{errors.image && errors.image.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className="signin-form__label" for="price">
            Price
          </Label>
          <Input
            id="price"
            className="signin-form__input"
            placeholder="Price here"
            name={price.name}
            onChange={price.onChange}
            onBlur={price.onBlur}
            innerRef={price.ref}
            invalid={errors.price && true}
            type="number"
          />
          <FormFeedback>
            {errors.price && "This field is required"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label className="signin-form__label" htmlFor="address">
            Address
          </Label>
          <Input
            id="address"
            className="signin-form__input"
            placeholder="Ho Chi Minh City"
            name={address.name}
            onChange={address.onChange}
            onBlur={address.onBlur}
            innerRef={address.ref}
            invalid={errors.address && true}
          />
          <FormFeedback>
            {errors.address && errors.address.message}
          </FormFeedback>
        </FormGroup>

        <Button className="button button--red">Add</Button>
      </Form>
    </div>
  );
}

export default AddProductForm;
